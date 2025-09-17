# python_service.py
from flask import Flask, request, jsonify
# from interloper import initialize_model, Session, Evaluator
app = Flask(__name__)

# Initialize values
session = None
status = "<CONTINUE>"

# When the service initializes
@app.route('/', methods=['GET'])
def home():
    # llm = initialize_model(model_path="../models/llama-3-8b-instruct_Q4_K_M.gguf")

    return "Model is initialized!"

# When the session is clicked
@app.route('/session/<id>', methods=['GET'])
def get_session(id):
    # session = Session(model=llm, session_n=int(id))

    # _, output, _ = session.generate_message() # This will take 1 minutes to execute, add timers to forbid user from texting
    return jsonify({"message": str(output)})

# When a message is sent
@app.route('/process', methods=['POST'])
def process():
    data = request.json
    human_message = data['message']

    status, output, _ = session.generate_message(input=str(human_message))



    # print(f"Received data: {data}")
    # if data['message'] == "lol":
    #     result = {"reply": "you said lol!"}
    # else:
    #     result = {"reply": f"Python received: {data['message']}"}
    # return jsonify(result)

if __name__ == '__main__':
    app.run(port=6000)