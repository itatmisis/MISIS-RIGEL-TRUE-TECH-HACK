import cv2
import numpy as np

from pb.video_receiving_pb2 import ColorBlindnessType


def lms_to_rgb():
    return np.array(
        [
            [0.0809, -0.1305, 0.1167],
            [-0.0102, 0.0540, -0.1136],
            [-0.0004, -0.0041, 0.6935],
        ]
    ).T


def to_new_rgb(image, degree, color_blindness_type: ColorBlindnessType):
    multiply = np.dot(load_lms(image), rgb_to_cvd_lms(color_blindness_type, degree))
    return np.uint8(np.dot(multiply, lms_to_rgb()) * 255)


def to_protanopic_lms(degree: float = 1.0):
    return np.array(
        [[1 - degree, 2.02344 * degree, -2.52581 * degree], [0, 1, 0], [0, 0, 1]]
    ).T


def to_deuteranopic_lms(degree: float = 1.0):
    return np.array(
        [[1, 0, 0], [0.494207 * degree, 1 - degree, 1.24827 * degree], [0, 0, 1]]
    ).T


def to_tritanopic_lms(degree: float = 1.0):
    return np.array(
        [[1, 0, 0], [0, 1, 0], [-0.395913 * degree, 0.801109 * degree, 1 - degree]]
    ).T


def rgb_to_cvd_lms(color_blindness_type: ColorBlindnessType, degree):
    match color_blindness_type:
        case ColorBlindnessType.PROTANOPIA:
            return to_protanopic_lms(degree)
        case ColorBlindnessType.DEUTERANOPIA:
            return to_deuteranopic_lms(degree)
        case ColorBlindnessType.TRITANOPIA:
            return to_tritanopic_lms(degree)


def rgb_to_lms() -> np.array:
    """
    Матрица конвертации
    """
    return np.array(
        [
            [17.8824, 43.5161, 4.11935],
            [3.45565, 27.1554, 3.86714],
            [0.0299566, 0.184309, 1.46709],
        ]
    ).T


def load_lms(image):
    """
    2 Шаг: конвертируем RGB в LMS
    """
    image_rgb = np.array(image) / 255
    return np.dot(image_rgb[:, :, :3], rgb_to_lms())


def gaussian_blurring(image):
    return cv2.GaussianBlur(image, (5, 5), 0)


def alpha_blending(converted_image, original_image):
    alpha = 0.9
    return cv2.addWeighted(converted_image, alpha, original_image, 1 - alpha, 0)
