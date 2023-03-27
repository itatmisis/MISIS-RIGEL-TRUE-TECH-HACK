import os

from adapter.consumer import Consumer

from constants import SEGMENTS_DIRECTORY

if __name__ == "__main__":
    if not os.path.exists(SEGMENTS_DIRECTORY):
        os.mkdir(SEGMENTS_DIRECTORY)

    Consumer().start()
