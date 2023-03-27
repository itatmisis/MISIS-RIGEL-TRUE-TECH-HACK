import os
from multiprocessing import cpu_count

KAFKA_SETTINGS = {
    "VIDEO_RECEIVING_TOPIC": os.getenv("VIDEO_RECEIVING_TOPIC", "video_receiving"),
    "HOST": os.getenv("VIDEO_PROCESSING_HOST"),
    "PORT": int(os.getenv("VIDEO_PROCESSING_PORT", 0)),
}

KAFKA_SETTINGS["SERVER"] = KAFKA_SETTINGS["HOST"] + ":" + str(KAFKA_SETTINGS["PORT"])

ME_CONFIG_MONGODB_URL = os.getenv("ME_CONFIG_MONGODB_URL")

CORES_NUMBER = os.getenv("CORES_NUMBER", cpu_count() - 1)

SEGMENTS_DIRECTORY = os.path.join(os.path.abspath, "segments")
