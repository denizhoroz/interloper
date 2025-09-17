from langchain_community.chat_models import ChatLlamaCpp
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.messages import SystemMessage

llm = ChatLlamaCpp(
    model_path=r"models/llama-3-8b-instruct-Q4_K_M.gguf", 
    n_ctx=4096,       
    n_gpu_layers=-1,     
    n_batch=512,       
    max_tokens=512,
    temperature=0.7,
    verbose=True,
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You produce two voices for every answer."),
    ("system", "Persona A (Alex) is a pragmatic, brief, focused on facts."),
    ("system", "Person B (Maya) is a friendly, adds context and examples."),
    MessagesPlaceholder("rules"),
    MessagesPlaceholder("history"),
    ("human", "{input}"), 
    ("system", "Return exactly two lines: 'Alex: <reply>' and 'Maya: <reply>'. Keep each under 120 words.")
])

chain = prompt | llm

_store = {}
def get_session_history(session_id: str):
    if session_id not in _store:
        _store[session_id] = ChatMessageHistory()
    return _store[session_id]

chatbot = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history",
)

rules = [
    SystemMessage(content="Do not make lists for explaining a topic and only use plain text."),
    SystemMessage(content="Do not produce NSFW (Not Safe For Work) content, including sexual, erotic, violent, or gory descriptions."),
    SystemMessage(content="Do not produce hateful, offensive, or discriminatory content toward individuals or groups."),
    SystemMessage(content="Do not share personal, confidential, or private data."),
    SystemMessage(content="If the user requests unsafe, NSFW, or disallowed content, politely refuse and suggest a safe alternative."),
    SystemMessage(content="Keep answers clear, informative, and aligned with ethical, positive communication."),
    SystemMessage(content="Do not use the word 'AI'."),
    SystemMessage(content="Use digits for numbers."),
    SystemMessage(content="Do not make lists for explaining a topic and only use plain text."),
    SystemMessage(content="Do not translate answers back to English."),
    SystemMessage(content="Person B Maya is a friendly, adds context and examples."),
]

if __name__ == "__main__":
    session_id = "user1"
    cfg = {"configurable": {"session_id": session_id}}

    print("Local chatbot ready. Type 'quit' to exit.\n")
    while True:
        user = input("You: ")
        if user.strip().lower() == "quit":
            break
        ai_msg = chatbot.invoke({"input": user, "rules": rules}, config=cfg)
        print(ai_msg.content)