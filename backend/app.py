from flask import Flask, jsonify, request
from myscript import Converter
from flask_restful import Resource, Api
from flask_cors import CORS
import awsgi

app = Flask(__name__)
CORS(app)
# api = Api(app)


# class Predict(Resource):
#     def post(self):
#         filename = request.json.get('file')
#         bucket_name = request.json.get('bucket')
#         bucket_name = bucket_name.split('/')[0]
#         filename = filename.replace(' ', '+')
#         img_url = f'https://{bucket_name}.s3.ap-south-1.amazonaws.com/upload/{filename}'
#         print(img_url)
#         result = Converter(img_url).convert()
#         return jsonify({'result': result})


# api.add_resource(Predict, '/predict')

@app.route('/', methods=['GET'])
def home():
    data = "hello world"
    return jsonify({'data': data})


def lambda_handler(event, context):
    return awsgi.response(app, event, context, base64_content_types={"image/png"})


if __name__ == '__main__':
    app.run(debug=True)
