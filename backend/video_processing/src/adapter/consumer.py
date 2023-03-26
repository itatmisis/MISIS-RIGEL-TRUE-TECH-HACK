from threading import Thread

from constants import KAFKA_SETTINGS
from kafka import KafkaConsumer


class Consumer:
    def __init__(self) -> None:
        self.consumer = KafkaConsumer(
            KAFKA_SETTINGS.TOPIC, bootstrap_servers=[KAFKA_SETTINGS.SERVER]
        )

    def _start_consuming(self, function) -> None:
        for msg in self.consumer:
            function(msg)

    def start(self) -> None:
        thread = Thread(target=self._start_consuming)
        thread.run()
