from pymongo import MongoClient
from video_tools import read_m3u8, read_segments
from constants import ME_CONFIG_MONGODB_URL


class Database:
    def __init__(self):
        self.connection_url = ME_CONFIG_MONGODB_URL
        self.client = MongoClient(self.connection_url)
        self.database_name = "segment_database"
        self.database = self.client[self.database_name]
        self.collection_name = "video"
        self.collection = self.database[self.collection_name]

    def update_m3u8(self, original_filename, directory):
        m3u8_in_bytes = read_m3u8(original_filename, directory)
        self.collection.insert(m3u8_in_bytes)

    def update_segments(self, original_filename, directory):
        segments_in_bytes = read_segments(original_filename, directory)
        self.collection.insert_many(segments_in_bytes)
