from pb.video_processing_pb2 import ColorBlindnessType

from .color_blindness import color_blindness_task
from .epilepsy import epilepsy_task


def epilepsy_and_color_blindness_task(image, color_blindness_type: ColorBlindnessType):
    return epilepsy_task(color_blindness_task(image, color_blindness_type))
