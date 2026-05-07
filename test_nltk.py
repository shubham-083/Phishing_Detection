import traceback
try:
    from nltk.corpus import stopwords
    print('ok', len(stopwords.words('english')))
except Exception as e:
    traceback.print_exc()
