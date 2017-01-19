from flask import render_template, redirect, url_for, Response, json

from ngVoiceAnalyzer import app, db
from models import TwitterSubmittedUser
from twitterservice import TwitterService 
from pandas import pandas as pd

@app.route('/voice/twitter')
def home():
    return render_template("base.html")


@app.route('/api/twitter/<username>')
def twitterApiCall(username):
    try:
        ts = TwitterService(username, 4000)
        tweet_data = {
            'dayOfWeek': ts.get_tweet_day_of_week_data().to_json(orient='records'),
            'hourOfDay': ts.get_tweet_hour_of_day_data().to_json(orient='records'),
            'sentimentData': ts.get_tweet_sentiment_data().to_json(orient='records'),
            'posNegData': ts.get_word_neg_pos_data().to_json(orient='records'),
            'wordCloudData': ts.get_word_cloud_data()
        }
        user = TwitterSubmittedUser(username=username)
        db.session.add(user)
        db.session.commit()
        return Response(json.dumps(tweet_data), status=200, mimetype='application/json')
    except Exception as ex:
        #save error to db
        return Response('Could not retrieve Twitter data, please verify username and try again', 
            status=500, mimetype='application/json')

