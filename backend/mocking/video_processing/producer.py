import sys
import time

import cv2
from kafka import KafkaProducer

from .constants import KAFKA_SETTINGS


class Producer:
    def __init__(self):
        self.producer = KafkaProducer(
            bootstrap_servers=KAFKA_SETTINGS.SERVER,
        )

    def send(self, video_file):
        video = cv2.VideoCapture(video_file)
        print("publishing video...")
        while video.isOpened():
            success, frame = video.read()

            if not success:
                print("video does not send")
                break

            _, buffer = cv2.imencode(".jpg", frame)
            self.producer.send(KAFKA_SETTINGS.TOPIC, buffer.tobytes())

            time.sleep(0.2)
        video.release()
        print("publish complete")
