#!/usr/bin/env python
# Author: Oliver Malkin
# Date: 29/10/2022
# Purpose:
# Generates a new room code (4 character - alphaneumeric)
# POST request /broker/makecode return code
# GET request /broker/getip/{code} return IP

import random, json, socket
from flask import Flask, request

app = Flask(__name__)

games = {} # Stores all the game IP's and room codes

@app.route('/broker/makecode', methods=['POST'])
def makecode():
    room_code = None
    ip = request.remote_addr

    for x in games:
        if games[x] == ip:
            return json.dumps({'code': None, 'status': 0})

    while True:
        room_code = ''.join([str(random.choice("123457890QWERTYUIOPASDFGHJKLZXCVBNM")) for i in range(4)])
        if room_code not in games:
            games[room_code] = ip
        else:
            break

    return json.dumps({'code': room_code, 'status': 1})     

@app.route('/broker/getip/<code>', methods=['GET'])
def get_ip(code):
    try:
        return json.dumps({'ip': games[code.upper()], 'status': 1})
    except KeyError:
        return json.dumps({'ip': None, 'status': 0})

if __name__ == '__main__':
    app.run(host=socket.gethostname())

@app.route('/broker/removeip/<code>', methods=['POST'])
def remove_ip(code):
    try:
        games.pop(code)
        return {'status': 1}
    except:
        return {'status': 0}