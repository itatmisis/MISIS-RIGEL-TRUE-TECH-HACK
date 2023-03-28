import os
from multiprocessing import cpu_count

KAFKA_SETTINGS = {
    "KAFKA_VIDEO_RECEIVING_TOPIC": os.getenv("KAFKA_VIDEO_RECEIVING_TOPIC", "videoReceiving"),
    "KAFKA_VIDEO_PROCESSING_TOPIC": os.getenv("KAFKA_VIDEO_PROCESSING_TOPIC", "videoProcessing"),
    "KAFKA_VIDEO_GROUP_ID": os.getenv("KAFKA_VIDEO_GROUP_ID"),
    "KAFKA_VIDEO_HOST": os.getenv("VIDEO_PROCESSING_HOST"),
    "KAFKA_VIDEO_PORT": int(os.getenv("VIDEO_PROCESSING_PORT", 0)),
}

KAFKA_SETTINGS["KAFKA_SERVER"] = KAFKA_SETTINGS["KAFKA_VIDEO_HOST"] + ":" + str(KAFKA_SETTINGS["KAFKA_VIDEO_PORT"])

MONGO_SETTINGS = {
    "MONGO_HOST": os.getenv("MONGO_HOST"),
    "MONGO_PORT": int(os.getenv("MONGO_PORT", 0))
}

CORES_NUMBER = os.getenv("CORES_NUMBER", cpu_count() - 1)

SEGMENTS_DIRECTORY = os.path.join(os.path.abspath("."), "segments")
