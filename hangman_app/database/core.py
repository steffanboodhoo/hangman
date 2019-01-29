from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func
from models import *
hangman_engine = create_engine(Util.database_uri, echo=False)

class db_client:
	
	def get_random_word(self):
		session = Session(hangman_engine)
		rec = session.query(Word).order_by(func.rand()).first().__dict__
		rec.pop('_sa_instance_state')
		print rec
		session.close()
		return rec