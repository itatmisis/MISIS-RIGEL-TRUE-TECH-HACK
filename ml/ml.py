import cv2
import numpy as np
from numpy import sqrt, cos, pi


# from backend.video_processing.src.processing.color_blindness.convert import gaussian_blurring


def w(k, N):
    if k == 1:
        return sqrt(1 / N)
    else:
        return sqrt(2 / N)


def y(k, N):
    return w(k, N) * sum(n * cos((pi / (2 * n)) * (2 * n - 1) * (k - 1)) for n in range(1, N + 1))


def spatial_smoothing(l: np.ndarray) -> np.ndarray:
    for i, row in enumerate(l):
        if i == 0:
            l[i] = (l[i] + l[i + 1]) / 2
        elif i == len(l) - 1:
            l[i] = (l[i - 1] + l[i]) / 2
        else:
            l[i] = (l[i - 1] + l[i] + l[i + 1]) / 3
    return l


def getI(video: np.ndarray, threshold: float) -> np.ndarray:
    I = []
    for i, frame in enumerate(video):
        if i != 0:
            diff: np.ndarray = frame - prev
            I.append(diff.sum(axis=1))
        prev = frame
    I = np.array(I)
    I = spatial_smoothing(I)
    I = I.sum(axis=0)
    I = I - np.mean(I)
    I = I / np.std(I)
    I = I > threshold
    return I


def getDangerMapping(video: np.ndarray, I: np.ndarray) -> np.array:
    return np.array((video, I), dtype=object)


def fade(image, strength=10) -> np.ndarray:
    width, height, _ = image.shape
    p1 = strength
    p2 = 100 - strength
    fade_range = list(range(int(height * p1), int(height * p2) - 10))
    pixels = image.copy()
    for y in fade_range:
        alpha = 255 - int((y - height * p1) / height / (p2 - p1) * 255)
        for x in range(width - 10):
            pixels[x, y] = pixels[x, y][:3] + (alpha,)
    return pixels


def gaussian_blurring(image: np.ndarray, blur_strength=25) -> np.ndarray:
    dst = cv2.GaussianBlur(image, (blur_strength, blur_strength), 0)
    return np.hstack((image, dst))


def epilepsy_task(images, threshold: float = 0.6) -> np.ndarray:
    new = []
    for image in images:
        I = getI(image, threshold)
        danger_mapping = getDangerMapping(image, I)
        strength = np.argwhere(danger_mapping[0] == image)[0][0]
        new.append(fade(image, strength))
    return np.array(new)


cap = cv2.VideoCapture(r'C:\Users\hehen\PycharmProjects\reshuege\v.mp4')
vid = []
while cap.isOpened():
    ret, frame = cap.read()
    if ret:
        vid.append(frame)
    else:
        break

task = epilepsy_task(vid)
for i in task:
    cv2.imshow('image', i)
    cv2.waitKey(0)
