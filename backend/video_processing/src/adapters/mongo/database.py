from pymongo import MongoClient

from constants import ME_CONFIG_MONGODB_URL
from singleton import Singleton


class Database(metaclass=Singleton):
    def __init__(self):
        self.connection_url = ME_CONFIG_MONGODB_URL
        self.client = MongoClient(self.connection_url)
        self.database_name = "segment_database"
        self.database = self.client[self.database_name]
        self.collection_name = "video"
        self.collection = self.database[self.collection_name]

    def get_byte_file(self, original_filename, filename):
        self.collection.find_one(
            {"original_filename": original_filename, "filename": filename}
        )
