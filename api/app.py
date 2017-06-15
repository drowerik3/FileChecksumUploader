from flask_restful import (
    Resource,
    reqparse,
    Api
)
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from config import DevelopmentConfig
from serializers import FileChecksumSchema


app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
CORS(app)
db = SQLAlchemy(app)
api = Api(app)

file_checksum_schema = FileChecksumSchema()


class FileChecksum(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    checksum = db.Column(db.String(255), unique=True)
    count = db.Column(db.Integer(), default=1)

    def __init__(self, checksum):
        self.checksum = checksum


class FileChecksumView(Resource):

    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('checksum', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        checksum = args['checksum']
        file_checksum = FileChecksum.query.filter_by(checksum=checksum).first()
        if not file_checksum:
            new_file_checksum = FileChecksum(checksum=checksum)
            db.session.add(new_file_checksum)
            db.session.commit()
            data, errors = file_checksum_schema.dump(new_file_checksum)
            return data, 201

        file_checksum.count += 1
        db.session.commit()
        data, errors = file_checksum_schema.dump(file_checksum)
        return data, 200

api.add_resource(FileChecksumView, '/api/file_checksum/')