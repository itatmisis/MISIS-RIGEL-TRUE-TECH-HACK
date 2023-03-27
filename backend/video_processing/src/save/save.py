import datetime
import os
import sys

import cv2
import ffmpeg_streaming
from ffmpeg_streaming import Formats

from adapters.mongo.database import Database
from constants import SEGMENTS_DIRECTORY
from pb.video_receiving_pb2 import (SegmentRequest, SegmentResponse,
                                    VideoMetadataRequest,
                                    VideoMetadataResponse)
from singleton import Singleton


def get_images_from_segment(database: Database, request: SegmentRequest):
    directory = os.path.join(SEGMENTS_DIRECTORY, os.path.splitext(request.filename)[0])
    segment_filename = "output" + str(request.number) + ".ts"
    path_to_segment_filename = os.path.join(directory, segment_filename)

    data = database.get_byte_file(request.filename, segment_filename)
    with open(path_to_segment_filename, "wb") as segment:
        segment.write(data)

    images = []
    video = cv2.VideoCapture(path_to_segment_filename)
    while video.isOpened():
        success, frame = video.read()

        _, buffer = cv2.imencode(".jpg", frame)
        images.append(buffer)

        if not success:
            break

    os.remove(path_to_segment_filename)
    return images


class TemporaryStorage(metaclass=Singleton):
    def __init__(self):
        self.storage = dict()

    def append(self, filename, frame):
        if self.storage.get(filename) is None:
            self.storage[filename] = [frame]
        else:
            self.storage[filename].append(frame)

    def get_images(self, filename):
        images = self.storage.get(filename)
        if not images:
            raise ValueError("Error")
        return images
