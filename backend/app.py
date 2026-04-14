from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json

import threading
import time
from datetime import datetime

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

SCHEDULE_FILE = "schedules.json"

def load_schedules():
    global schedules
    try:
        with open(SCHEDULE_FILE, "r") as f:
            schedules = json.load(f)
    except:
        schedules = []

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
        print("Websites blocked:", blocked_entries)

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

@app.route("/set-schedule", methods=["POST"])
def schedule():
    try:
        data = request.get_json(force=True)

        mode = data.get("mode", "").lower()
        startTime = data.get("startTime")
        endTime = data.get("endTime")

        if not mode or not startTime or not endTime:
            return jsonify({"error": "Missing data"}), 400

        if startTime >= endTime:
            return jsonify({"error": "Invalid time range"}), 400

        new_schedule = {
            "mode": mode,
            "startTime": startTime,
            "endTime": endTime
        }

        schedules.append(new_schedule)

        print("Schedule added:", new_schedule)

        return jsonify({
            "message": f"Schedule added for {mode}",
            "schedules": schedules
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": "Server error"}), 500



current_active_mode = None  # to avoid repeated execution
schedules = []
def scheduler_loop():
    global current_active_mode

    while True:
        now = datetime.now().strftime("%H:%M")
        matched_modes = []

        for s in schedules:
            if s["startTime"] <= now <= s["endTime"]:
                matched_modes.append(s["mode"])

        # Priority logic
        if "exam" in matched_modes:
            active_mode = "exam"
        elif "study" in matched_modes:
            active_mode = "study"
        elif "entertainment" in matched_modes:
            active_mode = "entertainment"
        else:
            active_mode = None

        if active_mode != current_active_mode:
            current_active_mode = active_mode

            if active_mode == "study":
                print(" STUDY MODE")
                block_websites()

            elif active_mode == "entertainment":
                print("ENTERTAINMENT MODE")
                unblock_websites()

            elif active_mode == "exam":
                print("EXAM MODE")
                block_websites()

            else:
                print("No active schedule")


        time.sleep(10)

# Start background thread

if __name__ == "__main__":
    load_schedules()  # 🔥 IMPORTANT
    print("Loaded schedules:", schedules)

    threading.Thread(target=scheduler_loop, daemon=True).start()
    app.run(port=5000, debug=False)