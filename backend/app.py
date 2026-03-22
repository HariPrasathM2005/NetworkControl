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


def get_blocked_sites():
    blocked = []

    with open(HOSTS_FILE, "r") as file:
        for line in file:
            for site in BLOCKED_SITES:
                if site in line and line.startswith(REDIRECT_IP):
                    blocked.append(site)

    return blocked

@app.route("/", methods=["GET"])
def home():
    return "Backend running with network control"


@app.route("/blocked-sites", methods=["GET"])
def blocked_sites():
    return jsonify({
        "blocked_sites": get_blocked_sites()
    })




@app.route("/set-mode", methods=["POST"])
def set_mode():
    data = request.get_json(force=True)
    mode = data.get("mode")

    print("Mode received:", mode)

    if mode == "study":
        block_websites()
        blocked_entries = []
        for site in BLOCKED_SITES:
            blocked_entries.append(f"{REDIRECT_IP} {site}")

        return jsonify({
            "message": "Study mode enabled. Websites blocked.",
            "blocked_sites": blocked_entries
        })

    elif mode == "entertainment":
        unblock_websites()
        return jsonify({"message": "Entertainment mode enabled. Websites unblocked."})

    else:
        return jsonify({"error": "Invalid mode"}), 400



@app.route("/add-sites", methods=["POST"])
def add_sites():
    data = request.get_json()
    new_sites = data.get("sites", [])

    print("New sites received:", new_sites)

    for site in new_sites:
        if site not in BLOCKED_SITES:
            BLOCKED_SITES.append(site)

    unblock_websites()
    block_websites()


    return jsonify({
        "message": "New sites added successfully",
        "blocked_sites": BLOCKED_SITES
    })


@app.route("/remove-site", methods=["POST"])
def remove_site():
    data = request.get_json()
    site_to_remove = data.get("site")

    if site_to_remove in BLOCKED_SITES:
        BLOCKED_SITES.remove(site_to_remove)

    # rewrite hosts file
    unblock_websites()
    block_websites()

    return jsonify({
        "message": "Site removed successfully",
        "blocked_sites": BLOCKED_SITES
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)