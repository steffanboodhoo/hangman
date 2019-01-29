from flask import Flask

hangman_app = Flask(__name__)
hangman_app.secret_key = 'SOMETHINGSECRETA'
from hangman_app import routes