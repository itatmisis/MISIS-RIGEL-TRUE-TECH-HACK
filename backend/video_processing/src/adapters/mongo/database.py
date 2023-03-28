from pymongo import MongoClient

from constants import MONGO_SETTINGS
from singleton import Singleton


class Database(metaclass=Singleton):
    def __init__(self):
        self.client = MongoClient(MONGO_SETTINGS["MONGO_HOST"], MONGO_SETTINGS["MONGO_PORT"])
        self.database_name = "segment_database"
        self.database = self.client[self.database_name]
        self.collection_name = "video"
        self.collection = self.database[self.collection_name]

    def get_byte_file(self, original_filename, filename):
        print({"original_filename": "_".join(original_filename.split("_")[:-1]), "filename": filename})
        # {'original_filename': 'Lonely_tree_at_Sunset_slow_motion_CCBY_NatureClip', 'filename': 'Lonely_tree_at_Sunset_slow_motion_CCBY_NatureClip.m3u8'}
        return self.collection.find_one(
            {"original_filename": "_".join(original_filename.split("_")[:-1]), "filename": filename}
        )
