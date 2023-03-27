from enum import Enum

from kafka import KafkaProducer

from constants import KAFKA_SETTINGS
from pb.video_receiving_pb2 import SegmentResponse
from singleton import Singleton


class Producer(metaclass=Singleton):
    def __init__(self) -> None:
        self.producer = KafkaProducer(
            bootstrap_servers=KAFKA_SETTINGS["SERVER"],
        )

    def send_video_metadata(self, filename, video_metadata):
        self.producer.send(
            SegmentResponse(
                filename=filename,
                videoMetadata=video_metadata,
            )
        )

    def send_segment(self, filename: str, images) -> None:
        self.producer.send(
            SegmentResponse(
                filename=filename,
                segment=bytes(images),
            )
        )
