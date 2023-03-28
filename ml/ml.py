from math import sqrt, cos, pi
import numpy as np


def w(k, N):
    if k == 1:
        return sqrt(1 / N)
    else:
        return sqrt(2 / N)


def y(k, N):
    return w(k, N) * sum(n * cos((pi / (2 * n)) * (2 * n - 1) * (k - 1)) for n in range(1, N + 1))


def spatial_smoothing(l):
    for i, row in enumerate(l):
        if i == 0:
            l[i] = (l[i] + l[i + 1]) / 2
        elif i == len(I) - 1:
            l[i] = (l[i - 1] + l[i]) / 2
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


def getDangerMapping(video, I):
    return dict(zip(video, I))


def epilepsy_task(image, dangerMapping, threshold):
    I = getI(video, threshold)
    dangerMapping = getDangerMapping(video, I)
    strength = dangerMapping[image]
    return gaussianBlur(image, strength)
