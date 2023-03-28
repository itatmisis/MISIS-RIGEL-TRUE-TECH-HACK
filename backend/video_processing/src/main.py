import os

from adapters.kafka.consumer import Consumer, Producer

from constants import SEGMENTS_DIRECTORY
from adapters.mongo.database import Database

if __name__ == "__main__":
    if not os.path.exists(SEGMENTS_DIRECTORY):
        os.mkdir(SEGMENTS_DIRECTORY)

    Database()
    Producer()
    Consumer().start()
