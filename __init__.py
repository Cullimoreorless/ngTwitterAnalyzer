import os

from twitter import OAuth, Twitter
from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy

from pandas import pandas as pd

# sentimentDF = pd.read_csv('./datasets/wordsentiment.csv')
# sentimentEmotionDF = pd.read_csv('./datasets/wordsentimentemotion.csv')
# posNegDF = pd.read_csv('./datasets/positivenegativeassociation.csv')

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config["SECRET_KEY"] = b'v\xb3y\xc4\xb9\x97\x14\xb4\x94\xe83\xee\xb9I\xbe`z>\x9a\x1b%\x98\xad<';
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+ os.path.join(basedir, 'twitterAnalyzer.db')
app.config['DEBUG'] = True

js_blueprint = Blueprint('jsstat', __name__, static_folder='node_modules')
app.register_blueprint(js_blueprint, url_prefix='')

db = SQLAlchemy(app)

consumer_key = "6a2GsQ39Pu918nXNUSsgA58AW"#"NZC6NuJoqyjnbCxYsyE4BeDlK"
consumer_secret = "9mpa8RzaYFeDy8G50Ua7fYIJSkXkENsXYvkzcqWH5pKez3AKcw"# "79IQqfEIdXUPnule0cHKdpEQQN74ApnkPq1QNHmlzVsOIwo14T"
access_token = "799759397039861760-HYNvHOP20FjuGhavLwVk0xYWqPWnXzE"#"1499062124-3M2uKdsAOw1SX86lcbUkoTa7tK3GQEggSyS8ZT4"
access_secret = "vWPpYWshNTlGOeSF3VuWixmNxLGvJsxu6pNR53wNS5AlZ"#"rHYzFHSpP4CLsHycg2GETfTfQ56PwTNFpopGLjAwof3tZ"


oauth = OAuth(access_token, access_secret, consumer_key, consumer_secret)

twitterApi = Twitter(auth=oauth)

import views

