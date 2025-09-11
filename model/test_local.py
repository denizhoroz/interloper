from transformers import AutoModelForCausalLM, AutoTokenizer, TextIteratorStreamer
import torch
import threading
import gradio as gr

# pick a small instruct/chat model
MODEL_NAME = "mistralai/Mistral-7B-Instruct-v0.2"

# load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    torch_dtype=torch.float16,   # use float16 if you have a GPU
    device_map="auto"            # automatically use GPU/CPU
)

def stream_response(message, history):
    # format conversation into a single prompt
    chat_history = ""
    for human, ai in history:
        chat_history += f"User: {human}\nAssistant: {ai}\n"
    chat_history += f"User: {message}\nAssistant:"

    inputs = tokenizer(chat_history, return_tensors="pt").to(model.device)

    streamer = TextIteratorStreamer(tokenizer, skip_prompt=True, skip_special_tokens=True)
    generation_kwargs = dict(
        **inputs,
        max_new_tokens=512,
        temperature=0.7,
        do_sample=True,
        top_p=0.9,
        streamer=streamer
    )

    thread = threading.Thread(target=model.generate, kwargs=generation_kwargs)
    thread.start()

    partial_text = ""
    for new_text in streamer:
        partial_text += new_text
        yield partial_text

# build gradio interface
demo = gr.ChatInterface(
    fn=stream_response,
    textbox=gr.Textbox(placeholder="Type something...", container=False, autoscroll=True),
    title="💬 Local Chatbot",
    description="Running fully local with Hugging Face Transformers"
)

demo.launch(debug=True, share=False)
