import cv2
import numpy as np


faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

class Detector(object):
    
    def __init__(self, link):
        self.imagefile = link


    def get_frame(self):
        image = cv2.imread(self.imagefile)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = faceCascade.detectMultiScale(
            gray,
            scaleFactor=1.3,
            minNeighbors=3,
            minSize=(30, 30)
        )

        for (x, y, w, h) in faces:
            fc = gray[y:y + h, x:x + w]
            roi = cv2.resize(fc, (48, 48))

        return roi[np.newaxis, :, :, np.newaxis]
