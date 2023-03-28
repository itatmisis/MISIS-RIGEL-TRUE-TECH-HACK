from pymongo import MongoClient
from video_tools import read_m3u8, read_segments
from constants import MONGO_SETTINGS


class Database:
    def __init__(self):
        self.client = MongoClient(MONGO_SETTINGS["MONGO_HOST"], MONGO_SETTINGS["MONGO_PORT"])
        self.database_name = "segment_database"
        self.database = self.client[self.database_name]
        self.collection_name = "video"
        self.collection = self.database[self.collection_name]

    def update_m3u8(self, original_filename, directory):
        m3u8_in_bytes = read_m3u8(original_filename, directory)
        self.collection.insert_many(m3u8_in_bytes)

        print({"original_filename": m3u8_in_bytes[0]["original_filename"], "filename": m3u8_in_bytes[0]["filename"]})
        print(self.collection.find_one(
            {"original_filename": m3u8_in_bytes[0]["original_filename"], "filename": m3u8_in_bytes[0]["filename"]}
        ))

    def update_segments(self, original_filename, directory):
        segments_in_bytes = read_segments(original_filename, directory)
        self.collection.insert_many(segments_in_bytes)
