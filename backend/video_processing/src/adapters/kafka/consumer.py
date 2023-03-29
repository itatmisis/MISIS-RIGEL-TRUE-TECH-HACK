import os
from threading import Thread

from kafka import KafkaConsumer
from adapters.mongo.database import Database
from .producer import Producer

from constants import KAFKA_SETTINGS
from pipeline.pipeline import Pipeline
from singleton import Singleton
from google.protobuf.message import Message
from pb.video_receiving_pb2 import (
    VideoMetadataRequest,
    SegmentRequest,
)


class Consumer(metaclass=Singleton):
    def __init__(self) -> None:
        self.consumer = KafkaConsumer(
            KAFKA_SETTINGS["KAFKA_VIDEO_PROCESSING_TOPIC"],
            bootstrap_servers=[KAFKA_SETTINGS["KAFKA_SERVER"]],
            api_version=(0,11,5),
        )

    def _start_consuming(self) -> None:
        for message in self.consumer:
            key = message.key.decode("utf-8")
            match key:
                case "VideoMetadataRequest":
                    video_metadata_request = VideoMetadataRequest()
                    video_metadata_request.ParseFromString(message.value)
                    original_filename = os.path.splitext(video_metadata_request.filename)[0]
                    file_data = Database().get_byte_file("_".join(original_filename.split("_")[:-1]), video_metadata_request.filename)
                    Producer().send(
                        file_data["filename"], file_data["content"]
                    )
                case "SegmentRequest":
                    segment_request = SegmentRequest()
                    segment_request.ParseFromString(message.value)
                    Pipeline().start_processing(segment_request)
                case _:
                    print("wrong message")

    def start(self) -> None:
        thread = Thread(target=self._start_consuming)
        thread.run()
