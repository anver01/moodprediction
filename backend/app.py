from flask import Flask, jsonify, request
from myscript import Converter
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
import awsgi

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    try:
        filename = request.json.get('file')
        bucket_name = request.json.get('bucket')
        bucket_name = bucket_name.split('/')[0]
        filename = filename.replace(' ', '+')
        img_url = f'https://{bucket_name}.s3.ap-south-1.amazonaws.com/upload/{filename}'
        result = Converter(img_url).convert()
        print(f'>>>>>>> This image is : {result} <<<<<<<<')
        return jsonify({'result': result, 'img_url': img_url})
    except Exception as err:
        print(err)
        return jsonify({'error': err})


@app.route('/', methods=['GET'])
def home():
    data = "hello world"
    return jsonify({'data': data})


def lambda_handler(event, context):
    return awsgi.response(app, event, context, base64_content_types={"image/png"})


if __name__ == '__main__':
    app.run(debug=True)
