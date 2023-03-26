import os

KAFKA_SETTINGS = {
    "TOPIC": os.getenv("VIDEO_PROCESSING_TOPIC"),
    "HOST": os.getenv("VIDEO_PROCESSING_HOST"),
    "PORT": os.getenv("VIDEO_PROCESSING_PORT"),
}

KAFKA_SETTINGS["SERVER"] = KAFKA_SETTINGS["HOST"] + ":" + KAFKA_SETTINGS["PORT"]
