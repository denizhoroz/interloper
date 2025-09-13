from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_models import ChatLlamaCpp
from langchain_core.messages import SystemMessage
from langchain_core.output_parsers import StrOutputParser

class Session:
    def __init__(self, model, session_n: int, title: str, description: str, language: str):
        self.model = model
        self.session_n = session_n
        self.title = title
        self.description = description
        self.language = language
        self.persona_text_list = []
        self.chat_history = []

        self.general_rules = SystemMessage("""
        - Do not make lists for explaining a topic and only use plain text.
        - Do not produce NSFW (Not Safe For Work) content, including sexual, erotic, violent, or gory descriptions.
        - Do not produce hateful, offensive, or discriminatory content toward individuals or groups.
        - Do not share personal, confidential, or private data.
        - If the user requests unsafe, NSFW, or disallowed content, politely refuse and suggest a safe alternative.
        - Keep answers clear, informative, and aligned with ethical, positive communication.
        - Do not use the word "AI".
        - Do not make lists for explaining a topic and only use plain text.
        - Always answer in {self.language}.
        - Do not translate answers back to English.
        """)

        self.persona_rules = SystemMessage("""
        - You are given a part of a dialogue in the format (Talker: Dialogue)
        - You must answer on behalf of the persona that is explicitly told to you.
        - Always prefix each dialogue with the person's name. For example, when you answer on behalf of a waiter you will say "Waiter: What would you like to order?"
        - You are going to expect a person information and a goal. You must accomplish this goal without getting distracted.
        - Never break format or switch into a generic assistant response.
        You have the persona and their specifics written here: 
        """)

    def add_persona(self, name: str, role: str, personality: str):
        persona_text = f"""
        Persona:
        - Name: {name},
        - Role: {role},
        - Personality: {personality}
        """
        self.persona_text_list.append(SystemMessage(persona_text))

    def build_chain(self):
        prompt = ChatPromptTemplate.from_messages(
            [
                self.general_rules,
                self.persona_rules,
                *self.persona_text_list,
                MessagesPlaceholder('history'),
                ('human', '{user_input}')
            ]
        )

        self.chain = prompt | self.model | StrOutputParser()