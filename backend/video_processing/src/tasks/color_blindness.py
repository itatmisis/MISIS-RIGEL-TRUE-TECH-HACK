from processing.color_blindness import (alpha_blending, gaussian_blurring,
                                        to_new_rgb)


def color_blindness_task(image, color_blindness_name: str):
    return alpha_blending(
        gaussian_blurring(to_new_rgb(image, color_blindness_name)), image
    )
