from flask import render_template, redirect, url_for

from ngVoiceAnalyzer import app, db

@app.route('/voice/twitter')
def home():
    return render_template("base.html")
