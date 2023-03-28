import datetime
import os
import sys

import cv2
import ffmpeg_streaming
from ffmpeg_streaming import Formats

from adapters.mongo.database import Database
from constants import SEGMENTS_DIRECTORY
from pb.video_receiving_pb2 import SegmentRequest
from singleton import Singleton
import subprocess


def get_images_from_segment(database: Database, request: SegmentRequest):
    original_filename = "_".join(request.filename.split(".")[0].split("_")[:-2])
    directory = os.path.join(SEGMENTS_DIRECTORY, original_filename)

    data = database.get_byte_file(original_filename, request.filename)

    if not os.path.exists(directory):
        os.mkdir(directory)

    path_to_segment_filename = os.path.join(directory, request.filename)
    with open(path_to_segment_filename, "wb") as segment:
        segment.write(data['content'])

    images = []
    video = cv2.VideoCapture(path_to_segment_filename)

    while video.isOpened():
        success, frame = video.read()
        if not success:
            break

        images.append(frame)

    os.remove(path_to_segment_filename)
    return images


def get_video(filename, images):
    if not images:
        raise ValueError(f"wrong name: {filename}")

    height, width, _ = images[0].shape
    size = (width, height)
    full_path = os.path.join(SEGMENTS_DIRECTORY, "_".join(filename.split(".")[0].split("_")[:-2]), filename)
    print(full_path)

    mp4_path = full_path.split('.')[0] + ".mp4"
    out = cv2.VideoWriter(mp4_path, cv2.VideoWriter_fourcc(*"MP4V"), 29, size)

    for frame in images:
        out.write(frame)
    out.release()

    infile = mp4_path
    subprocess.run(['ffmpeg', '-i', infile, full_path])

    with open(full_path, 'rb') as file:
        return file.read()
