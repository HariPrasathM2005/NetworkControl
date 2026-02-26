from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

BLOCKED_SITES = [
    "instagram.com",
    "www.instagram.com",
    "crazygames.com",
    "www.crazygames.com",
    "crazygames",
    "www.facebook.com",
    "facebook.com",
    "friv.com",
    "www.friv.com"
]

HOSTS_FILE = "/etc/hosts"
REDIRECT_IP = "127.0.0.1"


def block_websites():
    with open(HOSTS_FILE, "r") as file:
        content = file.read()

    with open(HOSTS_FILE, "a") as file:
        for site in BLOCKED_SITES:
            entry = f"{REDIRECT_IP} {site}\n"
            if entry not in content:
                file.write(entry)
    os.system("resolvectl flush-caches")


def unblock_websites():
    with open(HOSTS_FILE, "r") as file:
        lines = file.readlines()

    with open(HOSTS_FILE, "w") as file:
        for line in lines:
            if not any(site in line for site in BLOCKED_SITES):
                file.write(line)
    os.system("resolvectl flush-caches")


@app.route("/")
def home():
    return "Backend running with network control"


@app.route("/set-mode", methods=["POST"])
def set_mode():
    data = request.json
    mode = data.get("mode")

    if mode == "study":
        block_websites()
        return jsonify({"message": "Study mode enabled. Websites blocked."})

    elif mode == "entertainment":
        unblock_websites()
        return jsonify({"message": "Entertainment mode enabled. Websites unblocked."})

    else:
        return jsonify({"error": "Invalid mode"}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
    print("Mode received:", mode)