import datetime
import os
import sys

import ffmpeg_streaming
from ffmpeg_streaming import Formats, Bitrate, Representation, Size
from constants import VIDEO_DIRECTORY


def monitor(ffmpeg, duration, time_, time_left, process):
    per = round(time_ / duration * 5)
    sys.stdout.write(
        "\rTranscoding...(%s%%) %s left [%s%s]"
        % (per, datetime.timedelta(seconds=int(time_left)), "#" * per, "-" * (5 - per))
    )
    sys.stdout.flush()


def split_video_into_segments(filename):
    video = ffmpeg_streaming.input(os.path.join(VIDEO_DIRECTORY, filename))

    _480p = Representation(Size(854, 480), Bitrate(750 * 1024, 192 * 1024))

    hls = video.hls(Formats.h264())
    hls.representations(_480p)
    hls_output_directory = os.path.join(VIDEO_DIRECTORY, os.path.splitext(filename)[0])
    if not os.path.exists(hls_output_directory):
        os.mkdir(hls_output_directory)

    hls.output(
        os.path.join(hls_output_directory, filename), monitor=monitor
    )


def read_m3u8(original_filename, directory):
    m3u8_files = [file for file in os.listdir(directory) if os.path.splitext(file)[1] == ".m3u8"]
    videos = []
    for m3u8_file in m3u8_files:
        file = os.path.join(directory, m3u8_file)
        with open(file, "rb") as reading_file:
            videos.append({"original_filename": original_filename, "filename": file.split("/")[-1], "content": reading_file.read()})

    return videos


def read_segments(original_filename, directory):
    segments = []
    for file in os.listdir(directory):
        extension = os.path.splitext(file)[1]
        if extension == ".ts":
            with open(os.path.join(directory, file), "rb") as reading_file:
                segments.append({"original_filename": original_filename, "filename": file.split("/")[-1], "content": reading_file.read()})
    return segments
