from hangman_app import hangman_app as app
from flask import request, session
import gateway
import json, jwt
from functools import wraps
from flask_cors import CORS
cors = CORS(app, resources={r"/*": {"origins": "*"}}, headers=['Content-Type'], expose_headers=['Access-Control-Allow-Origin'], supports_credentials=True)

token_key = 'SOMETHINGSECRETB'
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/game/start', methods=['GET'])
def game_start():
    print session
    if 'state' in session:
        state = read_token()
        print 'from session'
        print state
        return json.dumps(state),200
    
    state = gateway.handle_game_start()
    token = jwt.encode(state, token_key)
    session['state'] = token
    return json.dumps(state),200

@app.route('/game/update', methods=['POST'])
def game_update():
    update_data = request.get_json()
    print update_data
    session.pop('state')
    session['state'] = jwt.encode(update_data, token_key)
    return '',204

@app.route('/game/reset', methods=['GET'])
def game_restore():
    if 'state' in session:
        session.pop('state')
    return '',204

def read_token():
	token = session['state']
	return jwt.decode(token, token_key)

@app.route('/score', methods=['GET','POST'])
def scores():
    if request.method == 'GET':
        return json.dumps(gateway.handle_get_scores())
    else:
        data = request.get_json()
        return json.dumps(gateway.handle_post_score(data)),200