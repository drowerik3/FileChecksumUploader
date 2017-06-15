from marshmallow import Schema


class FileChecksumSchema(Schema):
    class Meta:
        fields = ("checksum", "count")