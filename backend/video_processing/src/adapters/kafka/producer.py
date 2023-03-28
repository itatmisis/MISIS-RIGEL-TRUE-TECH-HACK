from enum import Enum

from kafka import KafkaProducer

from constants import KAFKA_SETTINGS
from pb.video_receiving_pb2 import SegmentResponse, VideoMetadataResponse
from singleton import Singleton


class Producer(metaclass=Singleton):
    def __init__(self) -> None:
        self.topic = KAFKA_SETTINGS["KAFKA_VIDEO_RECEIVING_TOPIC"]
        self.producer = KafkaProducer(
            bootstrap_servers=KAFKA_SETTINGS["KAFKA_SERVER"],
            client_id=KAFKA_SETTINGS["KAFKA_VIDEO_GROUP_ID"],
            api_version=(0,11,5),
        )

    def send_video_metadata(self, filename, video_metadata):
        print(self.topic)
        self.producer.send(
            topic=self.topic,
            key="VideoMetadataResponse".encode('utf-8'),
            value=VideoMetadataResponse(
                filename=filename,
                videoMetadata=video_metadata,
            ).SerializeToString()
        )

    def send_segment(self, filename: str, images) -> None:
        self.producer.send(
            topic=self.topic,
            key="SegmentResponse".encode('utf-8'),
            value=SegmentResponse(
                filename=filename,
                segment=bytes(images),
            ).SerializeToString()
        )
