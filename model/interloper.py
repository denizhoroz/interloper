from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_models import ChatLlamaCpp
from langchain_core.messages import SystemMessage
from langchain_core.output_parsers import StrOutputParser

class Session:
    def __init__(self, model, title: str, session_n: int, description: str, language: str):
        self.model = model
        self.title = title
        self.session_n = session_n
        self.description = description
        self.language = language
        self.persona_list = []
        self.chat_history = []

        self.rules = """
        - Do not make lists for explaining a topic and only use plain text.
        - Do not produce NSFW (Not Safe For Work) content, including sexual, erotic, violent, or gory descriptions.
        - Do not produce hateful, offensive, or discriminatory content toward individuals or groups.
        - Do not share personal, confidential, or private data.
        - If the user requests unsafe, NSFW, or disallowed content, politely refuse and suggest a safe alternative.
        - Keep answers clear, informative, and aligned with ethical, positive communication.
        - Do not use the word "AI".
        - Do not make lists for explaining a topic and only use plain text.
        - Always answer in {self.language}.
        - Prefix each dialogue with the person's name (e.g., Waiter:).
        - Do not translate answers back to English.
        """

    def add_persona(self, name: str, role: str, personality: str, goal: str):
        persona_text = """
        Persona:
        - Name: {name},
        - Role: {role},
        - Personality: {personality},
        - Goal: {goal}
        """
        self.persona_list.append(SystemMessage(content=persona_text.strip()))

    def build_chain(self):
        prompt = ChatPromptTemplate.from_messages(
            self.rules +
            self.persona_list + 
            [
                MessagesPlaceholder('history'),
                ('human', '{user_input}')
            ]
        )

        self.chain = prompt | self.model | StrOutputParser()