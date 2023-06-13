import tensorflow as tf
import requests
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from io import BytesIO

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Batasan ukuran file

def images_preprocessing(image):
    image = tf.io.decode_image(image, channels=3)
    image = tf.image.resize(image, [224, 224])
    image = image / 255.
    image_tensor = tf.expand_dims(image, 0)
    image_tensor = image_tensor.numpy().tolist()
    return image_tensor

@app.route('/')
def hello():
    return "Predict is running..."

@app.route('/predict', methods=['POST'])
def predict_nsfw():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400

        image = request.files['image']
        image_bytes = image.read()
        image_tensor = images_preprocessing(image_bytes)
        json_data = {
            "instances": image_tensor
        }
        endpoint = "https://image-model-v1-erjvsbrbwa-et.a.run.app/v1/models/nsfw_model:predict"
        response = requests.post(endpoint, json=json_data)
        response_data = response.json()

        if "predictions" not in response_data:
            return jsonify({'error': 'Unexpected response from NSFW model'}), 500

        prediction = tf.argmax(response_data['predictions'][0]).numpy()
        result = round(response_data['predictions'][0][0])
        map_labels = {0: "Nude", 1: "Safe"}
        return jsonify({'result': map_labels[result]}), 200
    except Exception as e:
        return jsonify({'error': 'Internal Error'}), 500

if __name__ == '__main__':
    app.run()
