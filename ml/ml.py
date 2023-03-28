import numpy as np
from numpy import sqrt, cos, pi
from typing import Iterable, Dict
from backend.video_processing.src.processing.color_blindness.convert import gaussian_blur


def w(k, N):
    if k == 1:
        return sqrt(1 / N)
    else:
        return sqrt(2 / N)


def y(k, N):
    return w(k, N) * sum(n * cos((pi / (2 * n)) * (2 * n - 1) * (k - 1)) for n in range(1, N + 1))


def spatial_smoothing(l: Iterable) -> Iterable:
    for i, row in enumerate(l):
        if (i == 0) or (i == len(I) - 1):
            l[i] = (l[i] + l[i + 1]) / 2
        else:
            l[i] = (l[i - 1] + l[i] + l[i + 1]) / 3
    return l


def getI(video: np.ndarray, threshold: float) -> np.ndarray:
    for i, frame in enumerate(video):
        if i != 0:
            diff: np.ndarray = frame - prev
            I.append(diff.sum(axis=1))
    I = np.array(I)
    I = spatial_smoothing(I)
    I = I.sum(axis=0).mean(axis=1)
    I -= np.mean(I)
    I /= np.std(I)
    I = I > threshold
    return I


def getDangerMapping(video: np.ndarray, I: np.ndarray) -> Dict:
    return dict(zip(video, I))


def darken(image: np.ndarray, darkenStrength=0.6) -> np.ndarray:
    minval = np.percentile(image, 2)
    maxval = np.percentile(image, 98)
    image = np.clip(image, minval, maxval)
    pixvals = ((pixvals - minval) / (maxval - minval)) * 255  # not sure about 255
    return image


def epilepsy_task(image: np.ndarray, dangerMapping: Dict, threshold: float, darkenStrength: float) -> np.ndarray:
    I = getI(video, threshold)
    dangerMapping = getDangerMapping(video, I)
    strength = dangerMapping[image]
    return darken(gaussian_blurring(image, blurStrength))
