import sys
import json

from textblob import TextBlob

test_sentence1 = sys.argv[1];

obj = TextBlob(test_sentence1)
sentiment = obj.sentiment.polarity



resp = {
    "Query" : test_sentence1,
    "sentiment" : sentiment,
}

print(json.dumps(resp))

sys.stdout.flush()




