import os

MONGO_SETTINGS = {
    "MONGO_HOST": os.getenv("MONGO_HOST"),
    "MONGO_PORT": int(os.getenv("MONGO_PORT", 0))
}

VIDEO_DIRECTORY = os.path.join(os.path.abspath("."), "videos")
