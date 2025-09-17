# python_service.py
from flask import Flask, request, jsonify
from interloper import initialize_model, Session, Evaluator
app = Flask(__name__)

# When the service initializes
@app.route('/', methods=['GET'])
def home():
    llm = initialize_model(model_path="../models/llama-3-8b-instruct_Q4_K_M.gguf")

    return "Model is initialized!"

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