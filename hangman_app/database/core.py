from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func
from models import Word, Score
from sqlalchemy.ext.automap import automap_base
from Utils import Util
hangman_engine = create_engine(Util.database_uri, echo=False)
Base = automap_base()
Base.prepare(hangman_engine, reflect=True)

class db_client:
	
	def get_random_word(self):
		session = Session(hangman_engine)
		rec = session.query(Word).order_by(func.rand()).first().__dict__
		rec.pop('_sa_instance_state')
		print rec
		session.close()
		return rec

	def get_scores(self):
		session = Session(hangman_engine)
		raw = session.query(Score).all()
		resp = []
		for rec in raw:
			rec = rec.__dict__
			rec.pop('_sa_instance_state')
			resp.append(rec)
		session.close()
		return resp

	def general_insert(self, entity, params):
		session = Session(hangman_engine)
		Entity = getattr(Base.classes, entity)
		new_entity = Entity(**params)
		print new_entity
		session.add(new_entity)
		session.flush()#ensures the data is written so any auto-generated ids are generated
		# session.close()
		resp = new_entity.__dict__
		resp.pop('_sa_instance_state')
		return resp