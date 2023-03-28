import os

from adapters.kafka.consumer import Consumer, Producer

from constants import SEGMENTS_DIRECTORY
from adapters.mongo.database import Database

from signal import signal, SIGPIPE, SIG_DFL
signal(SIGPIPE,SIG_DFL)

if __name__ == "__main__":
    if not os.path.exists(SEGMENTS_DIRECTORY):
        os.mkdir(SEGMENTS_DIRECTORY)

    Database()
    Producer()
    Consumer().start()
