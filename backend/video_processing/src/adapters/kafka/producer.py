from enum import Enum

from kafka import KafkaProducer

from constants import KAFKA_SETTINGS
from pb.video_receiving_pb2 import Response
from singleton import Singleton


class Producer(metaclass=Singleton):
    def __init__(self) -> None:
        self.topic = KAFKA_SETTINGS["KAFKA_VIDEO_RECEIVING_TOPIC"]
        self.producer = KafkaProducer(
            bootstrap_servers=KAFKA_SETTINGS["KAFKA_SERVER"],
            api_version=(0,11,5),
        )

    def send(self, filename, video):
        self.producer.send(
            topic=self.topic,
            value=Response(
                filename=filename,
                video=video,
            ).SerializeToString()
        )
