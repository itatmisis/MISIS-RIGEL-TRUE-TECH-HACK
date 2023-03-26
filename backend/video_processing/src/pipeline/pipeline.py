from multiprocessing import Pool

from constants import CORES_NUMBER, TASKS


class Pipeline:
    def __init__(self):
        self.pool = Pool(processes=CORES_NUMBER)

    def start_processing(self, image):
        self.pool.apply_async(task, args=(image,))
