from flask import send_from_directory
import sys
import os
import smtplib
import random
import string
import time
import requests   # ✅ NEW

from email.mime.text import MIMEText
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash

# -------------------------------
# PATH SETUP
# -------------------------------
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJECT_ROOT)

try:
    from src.predict import load_artifacts, predict_email
except ImportError:
    from source_code.predict import load_artifacts, predict_email

# -------------------------------
# APP CONFIG
# -------------------------------
app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

CORS(app)

# -------------------------------
# SERVE FRONTEND
# -------------------------------
@app.route('/')
def serve_frontend():
    return send_from_directory('templates', 'index.html')

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

# -------------------------------
# VIRUSTOTAL CONFIG (NEW)
# -------------------------------
VT_API_KEY = '20e5a8959ca94c71c0080140f697f23d6bc4ce53e5bea3b113a6d01a127ed015'   # 🔴 PUT YOUR KEY

def scan_url_virustotal(url):
    headers = {"x-apikey": VT_API_KEY}

    # Send URL
    response = requests.post(
        "https://www.virustotal.com/api/v3/urls",
        headers=headers,
        data={"url": url}
    )

    if response.status_code != 200:
        return {"error": "Failed to scan URL"}

    analysis_id = response.json()["data"]["id"]

    # Get report
    report = requests.get(
        f"https://www.virustotal.com/api/v3/analyses/{analysis_id}",
        headers=headers
    )

    result = report.json()
    stats = result["data"]["attributes"]["stats"]

    return {
        "malicious": stats.get("malicious", 0),
        "suspicious": stats.get("suspicious", 0),
        "harmless": stats.get("harmless", 0)
    }

# -------------------------------
# NEW ROUTE (VirusTotal API)
# -------------------------------
@app.route('/scan-url', methods=['POST'])
def scan_url():
    data = request.get_json()
    url = data.get("url", "")

    if not url:
        return jsonify({"error": "URL required"}), 400

    result = scan_url_virustotal(url)
    return jsonify(result)

# -------------------------------
# IN-MEMORY STORAGE
# -------------------------------
USERS = {}
OTP_STORE = {}

# -------------------------------
# EMAIL CONFIG
# -------------------------------
GMAIL_USER = 'your_gmail@gmail.com'
GMAIL_PASS = 'your_gmail_app_password'

def send_otp_email(email, otp):
    print(f"[DEBUG] OTP for {email}: {otp}")
    return True

# -------------------------------
# AUTH ROUTES
# -------------------------------
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({'success': False, 'msg': 'Email and password required'}), 400

    if email in USERS:
        return jsonify({'success': False, 'msg': 'Email already registered'}), 400

    USERS[email] = {
        'password_hash': generate_password_hash(password),
        'registered': True
    }

    return jsonify({'success': True, 'msg': 'Signup successful'})


@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()

    email = data.get('email', '').strip().lower()

    if not email or email not in USERS:
        return jsonify({'success': False, 'msg': 'Email not registered'}), 400

    otp = ''.join(random.choices(string.digits, k=6))

    OTP_STORE[email] = {
        'otp': otp,
        'expires': time.time() + 300
    }

    if send_otp_email(email, otp):
        return jsonify({'success': True, 'msg': 'OTP sent'})
    else:
        return jsonify({'success': False, 'msg': 'Failed to send OTP'}), 500


@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()

    email = data.get('email', '').strip().lower()
    otp = data.get('otp', '').strip()

    record = OTP_STORE.get(email)

    if not record or time.time() > record['expires']:
        return jsonify({'success': False, 'msg': 'OTP expired'}), 400

    if record['otp'] != otp:
        return jsonify({'success': False, 'msg': 'Invalid OTP'}), 400

    session['user'] = email
    OTP_STORE.pop(email, None)

    return jsonify({'success': True, 'msg': 'Login successful'})

# -------------------------------
# LOAD MODEL
# -------------------------------
print("🔄 Loading model...")

try:
    tfidf, scaler, model, threshold = load_artifacts()
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Model loading failed: {e}")
    tfidf = scaler = model = threshold = None

# -------------------------------
# PREDICTION API
# -------------------------------
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    email_text = data.get('email_text') or data.get('text', '')
    email_text = email_text.strip()

    if not email_text or len(email_text) < 10:
        return jsonify({'error': 'Input too short'}), 400

    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        result = predict_email(email_text, tfidf, scaler, model, threshold)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# -------------------------------
# RUN APP
# -------------------------------
if __name__ == '__main__':
    app.run(debug=True, port=5000)