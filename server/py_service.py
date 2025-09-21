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
    
    # Generate first message
    llm = initialize_model(model_path="../models/llama-3-8b-instruct_Q4_K_M.gguf")
    session = Session(model=llm, session_n=int(id))

    _, output, _ = session.generate_message() # Generate first message

    # Fetch json data
    with open("sessions.json", "r", encoding="utf-8") as f:
        sessions_data = json.load(f)
    session_info = next((s for s in sessions_data["sessions"] if str(s["session_n"]) == str(id)), None)
    if session_info:
        return jsonify({
            "title": session_info.get("title", ""),
            "description": session_info.get("description", ""),
            "prompts": session_info.get("prompts", []),
            "turns": session_info.get("turns", 0),
            "talker": session_info.get("talker", {}),
            "message": str(output)
        })
    
    return jsonify({"error": "Session not found"}), 404

# When a message is sent
@app.route('/process', methods=['POST'])
def process():
    global session_history
    data = request.json
    human_message = data['message']

    status, output, session_history = session.generate_message(input=str(human_message))

    # # Placeholder logic for testing
    # if human_message.lower() == "end":
    #     status = "<END OF CONVERSATION>"
    #     output = "Conversation ended. Thank you!"
    # else:
    #     status = "<CONTINUE>"
    #     output = f"Bot reply to: {human_message}"

    # session_history = "placeholder history"

    return jsonify({'message': str(output), 'status': str(status)})

@app.route('/session/<id>/evaluation', methods=['GET'])
def evaluate(id):
    evaluator = Evaluator(model=llm)  
    results = evaluator.evaluate(session_history)  

    # Dummy placeholder results for testing
    # results = {
    #     "Grammar": {"score": 7, "comment": "Bazı küçük dilbilgisi hataları vardı."},
    #     "Vocabulary": {"score": 8, "comment": "Kelime seçimin iyiydi, daha fazla çeşitlilik ekleyebilirsin."},
    #     "Fluency": {"score": 6, "comment": "Akıcılık fena değil, bazen duraksadın."},
    #     "Clarity": {"score": 9, "comment": "Mesajların çok net ve anlaşılırdı."}
    # }

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
        }})

if __name__ == '__main__':
    app.run(port=8000)