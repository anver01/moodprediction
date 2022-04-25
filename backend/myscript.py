from model import FacialExpressionModel
import numpy as np
import cv2
import urllib

faceCascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

model = FacialExpressionModel("model.json", "Final_model.h5")

# 1. Image will be served to this script, it will convert image to array
# 2. The array will be transferred to the model to predict and return the result
# 3. The result will be displayed through a view


class Converter(object):

    def __init__(self, link):
        self.filelink = link
        print(self.filelink)

    def convert(self):
        # image = cv2.imread(self.filelink)
        req = urllib.request.urlopen(self.filelink)
        image = np.asarray(bytearray(req.read()), dtype=np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = faceCascade.detectMultiScale(
            gray,
            scaleFactor=1.3,
            minNeighbors=3,
            minSize=(48, 48)
        )

        if len(faces) == 0:
            return "No Face Detected! Try Again"

        if len(faces) > 1:
            faces = faceCascade.detectMultiScale(
                gray,
                scaleFactor=1.3,
                minNeighbors=4,
                minSize=(80, 80)
            )
            for (x, y, w, h) in faces:
                fc = gray[y:y + h, x:x + w]
                roi = cv2.resize(fc, (48, 48))

        else:
            for (x, y, w, h) in faces:
                fc = gray[y:y + h, x:x + w]
                roi = cv2.resize(fc, (48, 48))

        #image = tf.keras.preprocessing.image.load_img(self.filelink, target_size=(48, 48), color_mode="grayscale")
        #test_image_array = tf.keras.preprocessing.image.img_to_array(image)
        #test_image_array = np.expand_dims(test_image_array, axis=0)
        result = model.predict_emotion(roi[np.newaxis, :, :, np.newaxis])
        return result
