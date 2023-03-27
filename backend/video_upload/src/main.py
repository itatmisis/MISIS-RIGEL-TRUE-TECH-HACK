import argparse
import os

from constants import VIDEO_DIRECTORY

from mongodb import Database
from video_tools import split_video_into_segments


def write_data(database, filename):
    original_filename = os.path.splitext(filename)[0]
    directory = os.path.join(VIDEO_DIRECTORY, original_filename)
    database.update_m3u8(original_filename, directory)
    database.update_segments(original_filename, directory)


if __name__ == "__main__":
    database = Database()

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-input", type=str, required=True, help="Name of the input video.",
    )

    args = parser.parse_args()
    split_video_into_segments(args.input)
    write_data(database, args.input)
