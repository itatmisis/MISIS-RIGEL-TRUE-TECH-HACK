import os
from threading import Thread

from kafka import KafkaConsumer
from mongo.database import Database
from producer import Producer

from constants import KAFKA_SETTINGS
from pb.video_receiving_pb2 import (ColorBlindnessType, SegmentRequest,
                                    SegmentResponse, TaskType,
                                    VideoMetadataRequest,
                                    VideoMetadataResponse)
from pipeline.pipeline import Pipeline
from singleton import Singleton
from tasks.tasks_types import TasksTypes


class Consumer(metaclass=Singleton):
    def __init__(self) -> None:
        self.consumer = KafkaConsumer(
            KAFKA_SETTINGS["TOPIC"], bootstrap_servers=[KAFKA_SETTINGS["SERVER"]]
        )

    def _start_consuming(self) -> None:
        for message in self.consumer:
            match type(message):
                case VideoMetadataRequest:
                    m3u8_filename = os.path.splitext(message.filename)[0]
                    Producer().send_video_metadata(
                        self.database.get_byte_file(message.filename, m3u8_filename)
                    )
                case SegmentRequest:
                    self.pipeline.start_processing(message)
                case _:
                    print("wrong message")

    def start(self) -> None:
        thread = Thread(target=self._start_consuming)
        thread.run()
