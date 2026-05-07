# app/app.py — FIXED VERSION
import sys
import os

# Add the project root to Python path so src/predict.py is found
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJECT_ROOT)

from flask import Flask, render_template, request, jsonify
from src.predict import load_artifacts, predict_email

app = Flask(__name__)

# Load once at startup — print confirmation so you know it worked
print("Loading model artifacts...")
try:
    tfidf, scaler, model, threshold = load_artifacts()
    print(f"✅ Model loaded! Threshold = {threshold}")
except FileNotFoundError as e:
    print(f"❌ ERROR: {e}")
    exit(1)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data       = request.get_json()
    email_text = data.get('email_text', '').strip()

    if not email_text:
        return jsonify({'error': 'No email text provided'}), 400

    if len(email_text) < 10:
        return jsonify({'error': 'Email text too short'}), 400

    result = predict_email(email_text, tfidf, scaler, model, threshold)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)