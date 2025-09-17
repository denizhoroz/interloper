# python_service.py
from flask import Flask, request, jsonify
app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return "Python Service is running!"

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    # print(f"Received data: {data}")
    if data['message'] == "lol":
        result = {"reply": "you said lol!"}
    else:
        result = {"reply": f"Python received: {data['message']}"}
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=6000)