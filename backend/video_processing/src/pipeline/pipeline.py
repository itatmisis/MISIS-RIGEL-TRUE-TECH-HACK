from multiprocessing import Pool

from adapters.kafka.producer import Producer

from constants import CORES_NUMBER
from pb.video_receiving_pb2 import SegmentRequest, TaskType
from save import get_images_from_segment, get_video
from tasks import (color_blindness_task, epilepsy_and_color_blindness_task,
                   epilepsy_task)
from adapters.mongo.database import Database
from functools import partial


class Pipeline:
    def __init__(self):
        self.pool = Pool(processes=CORES_NUMBER)
        self.pipeline = Producer()

    def start_processing(self, request: SegmentRequest):
        images = get_images_from_segment(Database(), request)
        match request.taskType:
            case TaskType.EPILEPSY:
                images_result = self.pool.map(epilepsy_task, images)  # self.pool.apply_async(epilepsy_task, args=(image,))
            case TaskType.COLOR_BLINDNESS:
                images_result = self.pool.map(partial(color_blindness_task, request.colorBlindnessType), images)
            case TaskType.EPILEPSY_AND_COLOR_BLINDNESS:
                images_result = self.pool.map(partial(epilepsy_and_color_blindness_task, request.colorBlindnessType), images)

        content = get_video(request.filename, images_result)
        self.pipeline.send(request.filename, content)
