# src/predict.py — FIXED VERSION
import os
import pickle
import json
import numpy as np
import re
import scipy.sparse as sp

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

# ── Path setup ──────────────────────────────────────────────
# Works correctly no matter where Flask is called from
BASE_DIR   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'models')

# ── NLP setup ───────────────────────────────────────────────
lemmatizer = WordNetLemmatizer()
stop_words  = set(stopwords.words('english'))
stop_words.update({'subject','from','sent','mail','email',
                   'http','www','com','would','could'})

# ── Text cleaning (must match Notebook 02 exactly) ──────────
def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'http\S+|www\.\S+', ' ', text)
    text = re.sub(r'\S+@\S+', ' ', text)
    text = re.sub(r'\d+', ' ', text)
    text = re.sub(r'[^\w\s]', ' ', text)
    text = re.sub(r'_', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def nlp_preprocess(text):
    tokens = word_tokenize(str(text))
    tokens = [lemmatizer.lemmatize(w) for w in tokens
              if w not in stop_words and len(w) > 2]
    return ' '.join(tokens)

# ── Load all artifacts once at import time ───────────────────
def load_artifacts():
    tfidf_path = os.path.join(MODELS_DIR, 'tfidf_vectorizer.pkl')
    scaler_path = os.path.join(MODELS_DIR, 'scaler.pkl')
    model_path  = os.path.join(MODELS_DIR, 'best_model.pkl')
    info_path   = os.path.join(MODELS_DIR, 'model_info.json')

    # Check files exist before loading
    for path in [tfidf_path, scaler_path, model_path]:
        if not os.path.exists(path):
            raise FileNotFoundError(
                f"Model file not found: {path}\n"
                f"Make sure you ran all notebooks and saved the models."
            )

    with open(tfidf_path,  'rb') as f: tfidf  = pickle.load(f)
    with open(scaler_path, 'rb') as f: scaler = pickle.load(f)
    with open(model_path,  'rb') as f: model  = pickle.load(f)

    threshold = 0.4  # safe default
    if os.path.exists(info_path):
        with open(info_path) as f:
            info = json.load(f)
            threshold = info.get('threshold', 0.4)

    return tfidf, scaler, model, threshold


# ── Feature extraction (must match Notebook 03 exactly) ─────
def extract_features(raw_text, tfidf, scaler):
    # Step 1: clean + NLP preprocess
    cleaned   = clean_text(raw_text)
    processed = nlp_preprocess(cleaned)

    # Step 2: TF-IDF on processed text
    X_tfidf = tfidf.transform([processed])

    # Step 3: numerical features — same 5 columns as training
    words       = cleaned.split()
    has_url     = 1 if re.search(r'http|www\.', raw_text.lower()) else 0
    subject_len = len(raw_text.split('\n')[0].split())  # first line ≈ subject

    numerical = np.array([[
        len(words),           # word_count
        len(cleaned),         # char_count
        len(set(words)),      # unique_word_count
        has_url,              # has_urls
        subject_len           # subject_length
    ]])

    # Step 4: scale numerical features using the SAME scaler from training
    X_num_scaled = scaler.transform(numerical)
    X_num_sparse = sp.csr_matrix(X_num_scaled)

    # Step 5: combine TF-IDF + numerical (same as training)
    X_final = sp.hstack([X_tfidf, X_num_sparse])

    return X_final


# ── Main prediction function ─────────────────────────────────
def predict_email(raw_text, tfidf, scaler, model, threshold=0.4):
    X_final = extract_features(raw_text, tfidf, scaler)

    # Get probability score
    if hasattr(model, 'predict_proba'):
        proba      = model.predict_proba(X_final)[0]
        phish_prob = float(proba[1])
    else:
        # Fallback for models without predict_proba
        score      = float(model.decision_function(X_final)[0])
        # Convert decision score to 0-1 range with sigmoid
        phish_prob = 1 / (1 + np.exp(-score))

    # Apply tuned threshold instead of default 0.5
    prediction = 1 if phish_prob >= threshold else 0

    confidence = round(
        phish_prob * 100 if prediction == 1
        else (1 - phish_prob) * 100,
        2
    )

    return {
        'prediction' : 'Phishing' if prediction == 1 else 'Legitimate',
        'label'      : prediction,
        'confidence' : confidence,
        'phish_prob' : round(phish_prob * 100, 2)
    }