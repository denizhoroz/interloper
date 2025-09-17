# python_service.py
from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    # print(f"Received data: {data}")
    if data['message'] == "hello":
        result = {"reply": "Hello from Python!"}
    else:
        result = {"reply": f"Python received: {data['message']}"}
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=6000)