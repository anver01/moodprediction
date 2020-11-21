from model import FacialExpressionModel
import tensorflow as tf
import numpy as np

model = FacialExpressionModel("model.json", "Final_model.h5")

# 1. Image will be served to this script, it will convert image to array
# 2. The array will be transferred to the model to predict and return the result
# 3. The result will be displayed through a view

class Converter(object):

    def __init__(self, link):
        self.filelink = link

    def convert(self):
        image = tf.keras.preprocessing.image.load_img(self.filelink, target_size=(48, 48), color_mode="grayscale")
        test_image_array = tf.keras.preprocessing.image.img_to_array(image)
        test_image_array = np.expand_dims(test_image_array, axis=0)
        result = model.predict_emotion(test_image_array)
        return result
