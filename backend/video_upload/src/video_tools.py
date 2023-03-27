import datetime
import os
import sys

import ffmpeg_streaming
from ffmpeg_streaming import Formats
from constants import VIDEO_DIRECTORY


def monitor(ffmpeg, duration, time_, time_left, process):
    per = round(time_ / duration * 10)
    sys.stdout.write(
        "\rTranscoding...(%s%%) %s left [%s%s]"
        % (per, datetime.timedelta(seconds=int(time_left)), "#" * per, "-" * (10 - per))
    )
    sys.stdout.flush()


def split_video_into_segments(self, filename):
    video = ffmpeg_streaming.input(os.path.join(VIDEO_DIRECTORY, filename))

    hls = video.hls(Formats.h264())
    hls.auto_generate_representations()
    hls.output(
        os.path.join(VIDEO_DIRECTORY, os.path.splitext(filename)[0]), monitor=monitor
    )


def read_m3u8(original_filename, directory):
    m3u8_file = [file for file in os.listdir() if os.path.splitext()[1] == ".m3u8"][0]
    with open(m3u8_file, "rb") as reading_file:
        return {"original_filename": original_filename, "filename": m3u8_file, "content": reading_file.read()}


def read_segments(original_filename, directory):
    segments = []
    for file in os.listdir():
        _, extension = os.path.splitext(file)
        if extension == ".ts":
            with open(file, "rb") as reading_file:
                segments.append({"original_filename": original_filename, "filename": file, "content": reading_file.read()})
    return segments
