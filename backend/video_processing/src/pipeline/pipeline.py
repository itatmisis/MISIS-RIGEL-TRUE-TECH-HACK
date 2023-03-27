from multiprocessing import Pool

from adapters.producer import Producer

from constants import CORES_NUMBER
from pb.video_receiving_pb2 import SegmentRequest
from save import TemporaryStorage, get_images_from_segment
from tasks import (color_blindness_task, epilepsy_and_color_blindness_task,
                   epilepsy_task)


class Pipeline:
    def __init__(self, database):
        self.pool = Pool(processes=CORES_NUMBER)
        self.storage = TemporaryStorage()

    def start_processing(self, request: SegmentRequest):
        for image in get_images_from_segment(self.database, request):
            image_result = image
            match request.TaskType:
                case request.TaskType.EPILEPSY:
                    image_result = self.pool.apply_async(epilepsy_task, args=(image,))
                case request.TaskType.COLOR_BLINDNESS:
                    image_result = self.pool.apply_async(
                        color_blindness_task, args=(image, request.ColorBlindnessType)
                    )
                case request.TaskType.EPILEPSY_AND_COLOR_BLINDNESS:
                    image_result = self.pool.apply_async(
                        epilepsy_and_color_blindness_task,
                        args=(image, request.ColorBlindnessType),
                    )

            self.storage.append(request.filename, image_result)
            Producer().send_segment(
                request.filename, self.storage.get(request.filename)
            )
