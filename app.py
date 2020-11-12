from flask import Flask, jsonify, Response, url_for
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import json

import numpy as np
import datetime as dt
#import scrape_mars

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/crime_data"
mongo = PyMongo(app)

@app.route("/")
def homepage(): 
    # Find data
    # crimeinfo = mongo.db.crime_data.find_one()
    #marsinfo = mongo.db.marsdata.find_one()

    # Return template and data
    return render_template("index.html")
    #return render_template("index.html", mars_=marsinfo)

@app.route("/api/data")
def data():
    crimeinfo = list(mongo.db.project2.find())
    return Response(json.dumps(crimeinfo,default=str),mimetype="application/json")


if __name__ == "__main__":
    app.run(debug=True)