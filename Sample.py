from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return "Backend is running on Ubuntu!"

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    return jsonify({
        "message": "Login successful",
        "user": data
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)