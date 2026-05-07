import runpy
m = runpy.run_path('source code/predict.py')
print('module loaded')
tfidf, scaler, model = m['load_artifacts']()
print('artifacts loaded')
out = m['predict_email']('Dear user, please confirm your account at http://example.com/login', tfidf, scaler, model)
print(out)
