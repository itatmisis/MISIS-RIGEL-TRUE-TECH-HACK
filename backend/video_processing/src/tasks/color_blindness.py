from pb.video_receiving_pb2 import ColorBlindnessType
from processing.color_blindness import (alpha_blending, gaussian_blurring,
                                        to_new_rgb)


def color_blindness_task(color_blindness_type: ColorBlindnessType, image):
    return alpha_blending(
        gaussian_blurring(to_new_rgb(image, color_blindness_type)), image
    )
