# python_service.py
from flask import Flask, request, jsonify
# from interloper import initialize_model, Session, Evaluator
app = Flask(__name__)

# Initialize values
# session = None
# session_history = None

# When the service initializes
@app.route('/', methods=['GET'])
def home():
    print('initializing')

    # global llm
    # llm = initialize_model(model_path="../models/llama-3-8b-instruct_Q4_K_M.gguf")

    print('initialized')
    return "200" # when the model initializes

# When the session is clicked
@app.route('/session/<id>', methods=['GET'])
def get_session(id):
    print('session clicked')

    # global session
    # session = Session(model=llm, session_n=int(id))

    # _, output, _ = session.generate_message() # This will take 1 minutes to execute, add timers to forbid user from texting

    print('session initialized')
    return jsonify({"message": "message from bot but initialized"}) # runs on session init

# When a message is sent
@app.route('/process', methods=['POST'])
def process():
    data = request.json
    human_message = data['message']

    # status, output, session_history = session.generate_message(input=str(human_message))

    return jsonify({'message': "message", 'status': "status"}) # status: <END OF CONVERSATION>, <CONTINUE>
    # message will be bot's reply, status will indicate conversation end or continuation

    # print(f"Received data: {data}")
    # if data['message'] == "lol":
    #     result = {"reply": "you said lol!"}
    # else:
    #     result = {"reply": f"Python received: {data['message']}"}
    # return jsonify(result)

if __name__ == '__main__':
    app.run(port=8000)