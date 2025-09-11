from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import gradio as gr
import os

load_dotenv()

# choose a free/lightweight model
HF_MODEL = "HuggingFaceH4/zephyr-7b-beta"
HF_TOKEN = os.getenv("HF_TOKEN")  # optional if model is public

client = InferenceClient(model=HF_MODEL, token=HF_TOKEN)

system_message = {
    "role": "system",
    "content": (
        "You are a helpful, friendly chatbot. "
        "Always answer casually like you are chatting with a friend. "
        "Never talk about any topic unless the user asks directly."
    )
}

def stream_response(message, history):
    # build messages: user & assistant pairs
    messages = []
    for human, ai in history:
        messages.append({"role": "user", "content": human})
        messages.append({"role": "assistant", "content": ai})

    # add latest user input
    messages.append({"role": "user", "content": message})

    partial_message = ""
    for response in client.chat_completion(
        messages=messages,
        max_tokens=512,
        stream=True,
    ):
        if "choices" in response:
            delta = response["choices"][0]["delta"].get("content", "")
            if delta:
                partial_message += delta
                yield partial_message

# gradio chat ui
demo = gr.ChatInterface(
    fn=stream_response,
    textbox=gr.Textbox(placeholder="Say something...", container=False, autoscroll=True),
    title="💬 Basic Chatbot",
    description="A simple chatbot using Hugging Face Inference API",
)

demo.launch(debug=True, share=True)
