from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json

import threading
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)
lock = threading.Lock()

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

schedule_enabled = False


def load_schedules(SCHEDULE_FILE_LocatStorage):
    global schedules
    print("running")
    try:
        with open(SCHEDULE_FILE_LocatStorage, "r") as f:
            schedules = json.load(f)
    except:
        schedules = []
    return schedules

def normalize(site):
    site = site.replace("https://", "").replace("http://", "")
    return site.replace("www.", "").strip()

def block_websites():
    with open(HOSTS_FILE, "r") as file:
        content = file.read()

    with open(HOSTS_FILE, "a") as file:
        for site in BLOCKED_SITES:
            entry = f"{REDIRECT_IP} {site}\n"
            if entry not in content:
                file.write(entry)
    os.system("resolvectl flush-caches")

def block_websites2(Blocked_Sites):
    with open(HOSTS_FILE, "r") as file:
        content = file.read()

    with open(HOSTS_FILE, "a") as file:
        for site in Blocked_Sites:
            entry = f"{REDIRECT_IP} {site}\n"
            if entry not in content:
                file.write(entry)
    os.system("resolvectl flush-caches")

def block_websites3(Blocked_Sites):
    with open(HOSTS_FILE, "r") as file:
        content = file.read()

    with open(HOSTS_FILE, "a") as file:
        for site in Blocked_Sites:
            site = normalize(site)

            entries = [
                f"{REDIRECT_IP} {site}\n",
                f"{REDIRECT_IP} www.{site}\n"
            ]

            for entry in entries:
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

def unblock_website2(site_to_remove):
    site_to_remove = normalize(site_to_remove)

    with open(HOSTS_FILE, "r") as file:
        lines = file.readlines()

    with open(HOSTS_FILE, "w") as file:
        for line in lines:
            if site_to_remove not in normalize(line):
                file.write(line)

    os.system("resolvectl flush-caches")

def get_blocked_sites():
    blocked = []

    with open(HOSTS_FILE, "r") as file:
        for line in file:
            for site in BLOCKED_SITES:
                if site in line and line.startswith(REDIRECT_IP):
                    blocked.append(site)
    print("Blocked sites: ", blocked)
    if(blocked==[]):
        print("No sites are currently blocked.")

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
        os.system("sudo iptables -P OUTPUT ACCEPT")
        os.system("sudo iptables -A OUTPUT -d 127.0.0.1 -j ACCEPT")
        os.system("sudo iptables -A OUTPUT -o lo -j ACCEPT")

        os.system("sudo iptables -A OUTPUT -o lo -j ACCEPT")
        os.system("sudo iptables -A INPUT -i lo -j ACCEPT")
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
        os.system("sudo iptables -P OUTPUT ACCEPT")
        os.system("sudo iptables -A OUTPUT -d 127.0.0.1 -j ACCEPT")
        os.system("sudo iptables -A OUTPUT -o lo -j ACCEPT")

        os.system("sudo iptables -A OUTPUT -o lo -j ACCEPT")
        os.system("sudo iptables -A INPUT -i lo -j ACCEPT")
        return jsonify({"message": "Entertainment mode enabled. Websites unblocked."})
    
    elif mode == "exam":
        os.system("sudo iptables -P OUTPUT DROP")
        os.system("sudo iptables -A OUTPUT -d 127.0.0.1 -j ACCEPT")
        os.system("sudo iptables -A OUTPUT -o lo -j ACCEPT")

        os.system("sudo iptables -A OUTPUT -o lo -j ACCEPT")
        os.system("sudo iptables -A INPUT -i lo -j ACCEPT")
        return jsonify({"message": "Exam mode enabled. All network traffic blocked."})

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

@app.route("/remove-sites", methods=["POST"])
def remove_sites():
    data = request.get_json()
    new_sites = data.get("site")
    new=[]

    print("New sites received:", new_sites)

    for site in BLOCKED_SITES:
        if site not in new_sites:
            new.append(site)
    
    BLOCKED_SITES=new

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

    '''if site_to_remove in BLOCKED_SITES:
        BLOCKED_SITES.remove(site_to_remove)

    # rewrite hosts file
    unblock_websites()
    print("Updated blocked sites:", BLOCKED_SITES)
    block_websites2(BLOCKED_SITES)'''

    unblock_website2(site_to_remove)

    return jsonify({
        "message": "Site removed successfully",
        "blocked_sites": BLOCKED_SITES
    })



# Start background thread

def get_mode_from_schedule(schedules):
    now = datetime.now().time()

    for s in schedules:
        start = datetime.strptime(s["startTime"], "%H:%M").time()
        end = datetime.strptime(s["endTime"], "%H:%M").time()

        if start <= now <= end:
            return s["mode"]   # only mode

    return None

@app.route("/sync-schedules", methods=["POST"])
def sync_schedules():
    global schedules
    data = request.get_json()
    with lock:
        schedules = data.get("schedules", [])

    print("Schedules synced:", schedules)

    mode=get_mode_from_schedule(schedules)
    print("Current mode based on schedule:", mode)
    if(schedule_enabled==True):
        set_mode2(mode)


    return jsonify({"message": "Schedules updated"})


def set_mode2(mode):
    data = request.get_json(force=True)

    print("Mode received:", mode)

    if mode == "study":
        os.system("sudo iptables -P OUTPUT ACCEPT")
        os.system("sudo iptables -A OUTPUT -d 127.0.0.1 -j ACCEPT")
        os.system("sudo iptables -A OUTPUT -o lo -j ACCEPT")

        os.system("sudo iptables -A OUTPUT -o lo -j ACCEPT")
        os.system("sudo iptables -A INPUT -i lo -j ACCEPT")
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
        os.system("sudo iptables -P OUTPUT ACCEPT")
        os.system("sudo iptables -A OUTPUT -d 127.0.0.1 -j ACCEPT")
        os.system("sudo iptables -A OUTPUT -o lo -j ACCEPT")

        os.system("sudo iptables -A OUTPUT -o lo -j ACCEPT")
        os.system("sudo iptables -A INPUT -i lo -j ACCEPT")
        return jsonify({"message": "Entertainment mode enabled. Websites unblocked."})
    
    elif mode == "exam":
        os.system("sudo iptables -P OUTPUT DROP")
        os.system("sudo iptables -A OUTPUT -d 127.0.0.1 -j ACCEPT")
        os.system("sudo iptables -A OUTPUT -o lo -j ACCEPT")

        os.system("sudo iptables -A OUTPUT -o lo -j ACCEPT")
        os.system("sudo iptables -A INPUT -i lo -j ACCEPT")
        return jsonify({"message": "Exam mode enabled. All network traffic blocked."})

    else:
        return jsonify({"error": "Invalid mode"}), 400
    

    
@app.route("/enable-schedule", methods=["POST"])
def enable_schedule():
    global schedule_enabled

    data = request.get_json()
    schedule_enabled = data.get("enabled", False)

    print("Schedule mode:", schedule_enabled)

    return jsonify({"message": "Schedule mode updated"})

if __name__ == "__main__":
    app.run(port=5000, debug=False)