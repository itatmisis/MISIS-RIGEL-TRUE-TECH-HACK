from math import sqrt, cos, pi

import cv2
import matplotlib.pyplot as plt
import numpy as np


def w(k, N):
    if k == 1:
        return sqrt(1 / N)
    else:
        return sqrt(2 / N)


def y(k, N):
    return w(k, N) * sum(n * cos((pi / (2 * n)) * (2 * n - 1) * (k - 1)) for n in range(1, N + 1))


def spatial_smoothing(l):
    print(l.shape)
    print(l)
    for i, row in enumerate(l):
        if i == 0:
            l[i] = (l[i] + l[i + 1]) / 2
        elif i == len(I)-1:
            l[i] = (l[i - 1] + l[i]) / 2
        else:
            l[i] = (l[i - 1] + l[i] + l[i + 1]) / 3
    return l


cap = cv2.VideoCapture('v.mp4')

if not cap.isOpened():
    print("Error opening video stream or file")
i = 0
I = []
while cap.isOpened():
    ret, frame = cap.read()
    if ret:
        cv2.imshow('Frame', frame)
        if i % 30 == 0:
            fig, ax = plt.subplots()
            # plt.imshow(frame)
            colors = ("red", "green", "blue")
            # plt.figure()
            plt.xlim([0, 256])
            for channel_id, color in enumerate(colors):
                histogram, bin_edges = np.histogram(
                    frame[:, :, channel_id], bins=256, range=(0, 256)
                )
                # plt.plot(bin_edges[0:-1], histogram, color=color)

        if i != 0:
            diff: np.array = frame - prev
            I.append(diff.sum(axis=1))
        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
        i += 1
        prev = frame
    else:
        break

cap.release()

cv2.destroyAllWindows()

I = np.array(I)
I = spatial_smoothing(I)
threshold = 655352
print(I.sum(axis=0).mean(axis=1) > threshold)
