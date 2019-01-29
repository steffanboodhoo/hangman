from database import db_client

def handle_game_start():
    client = db_client()
    state = client.get_random_word()
    state['word']  = state['word'].lower()
    state['solution'] = ['_' if c != ' ' else c  for c in state['word']] # solution is set of '_' characters and spaces (if exist)
    state['health'] = 5
    return state