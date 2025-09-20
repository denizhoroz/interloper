# python_service.py
import time
import json
from flask import Flask, request, jsonify
from interloper import initialize_model, Session, Evaluator
app = Flask(__name__)

# Initialize values
session = None
session_history = None

with open("sessions.json", "r", encoding="utf-8") as f:
    session_info = json.load(f)

# When the service initializes
@app.route('/', methods=['GET'])
def home():
    return "200" # page opens

# When the session is clicked
@app.route('/session/<id>', methods=['GET'])
def get_session(id):
    global llm, session
    
    print('session clicked')
    
    llm = initialize_model(model_path="../models/llama-3-8b-instruct_Q4_K_M.gguf")
    session = Session(model=llm, session_n=int(id))

    _, output, _ = session.generate_message() # This will take 1 minutes to execute, add timers to forbid user from texting

    # Add session start timer and eval timer # <=========== 

    print('session initialized')
    return jsonify({"message": str(output)}) # runs on session init

# When a message is sent
@app.route('/process', methods=['POST'])
def process():
    global session_history
    data = request.json
    human_message = data['message']

    status, output, session_history = session.generate_message(input=str(human_message))

    return jsonify({'message': str(output), 'status': str(status)}) # status: <END OF CONVERSATION>, <CONTINUE>
    # message will be bot's reply, status will indicate conversation end or continuation

    # print(f"Received data: {data}")
    # if data['message'] == "lol":
    #     result = {"reply": "you said lol!"}
    # else:
    #     result = {"reply": f"Python received: {data['message']}"}
    # return jsonify(result)

@app.route('/session/<id>/evaluation', methods=['GET'])
def evaluate(id):
    print('evaluation clicked')
    
    evaluator = Evaluator(model=llm)
    results = evaluator.evaluate(session_history)

    return jsonify({
        "criteria": [
            {"key": "Grammar", "label": "Gramer"},
            {"key": "Vocabulary", "label": "Kelime Dağarcığı"},
            {"key": "Fluency", "label": "Akıcılık"},
            {"key": "Clarity", "label": "Açıklık"}
        ],
        "scores": {
            "Grammar": results['Grammar']['score'],
            "Vocabulary": results['Vocabulary']['score'],
            "Fluency": results['Fluency']['score'],
            "Clarity": results['Clarity']['score']
        },
        "critiques": {
            "Grammar": results['Grammar']['comment'],
            "Vocabulary": results['Vocabulary']['comment'],
            "Fluency": results['Fluency']['comment'],
            "Clarity": results['Clarity']['comment']
        },
        "scenario": {
            "title": "Restoran",
            "description": "Bir restoranda geçen konuşma senaryosu.",
            "details": [
                "Garson ile sipariş verme",
                "Arkadaş ile sohbet",
                "Hesap isteme"
            ]
        }
    })

if __name__ == '__main__':
    app.run(port=8000)