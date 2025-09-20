from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_models import ChatLlamaCpp
from langchain_core.messages import SystemMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage
from langchain.chains import LLMChain
import json
import re
import ast

def initialize_model(model_path, n_ctx=4096, n_gpu_layers=-1, n_batch=512, max_tokens=256, temperature=0.7):
    llm = ChatLlamaCpp(
        model_path=model_path, 
        n_ctx=n_ctx,       
        n_gpu_layers=-n_gpu_layers,     
        n_batch=n_batch,       
        max_tokens=max_tokens,
        temperature=temperature
    )

    return llm

class Session:
    def __init__(self, model, session_n: int):
        # Initialize model
        self.model = model
        self.session_n = session_n

        # Load session
        self.load_session()

    def load_session(self):
        with open("sessions.json", "r", encoding="utf-8") as f:
            sessions = json.load(f)

        # Load session information
        self.session = sessions['sessions'][0]
        self.title = self.session['title']
        self.description = self.session['description']
        self.language = sessions['settings']['target_language']
        self.persona_text_list = []
        self.chat_history = []
        self.session_history = []
        self.human_input = ''
        self.i = 0

        # Add personality
        self.add_persona(
            name=self.session['talker']['name'],
            role=self.session['talker']['role'],
            personality=self.session['talker']['personality']
        )

        # self.general_rules = SystemMessage("""
        # - Do not make lists for explaining a topic and only use plain text.
        # - Do not produce NSFW (Not Safe For Work) content, including sexual, erotic, violent, or gory descriptions.
        # - Do not produce hateful, offensive, or discriminatory content toward individuals or groups.
        # - Do not share personal, confidential, or private data.
        # - If the user requests unsafe, NSFW, or disallowed content, politely refuse and suggest a safe alternative.
        # - Keep answers clear, informative, and aligned with ethical, positive communication.
        # - Do not use the word "AI".
        # - Do not make lists for explaining a topic and only use plain text.
        # - Always answer in simple {self.language}.
        # - Do not translate answers back to English.
        # """)

        # self.persona_rules = SystemMessage("""
        # - You must answer on behalf of the persona that is explicitly told to you.
        # - You are going to expect a person information and a goal. You must accomplish this goal without getting distracted.
        # - Never break format or switch into a generic assistant response.
        # - Only speak as the persona. Do NOT explain, introduce, or say "Here is my response:", "Here is a possible response:" or "Here is a revised version of the response:".
        # - Do not say the exact things you said before, do not repeat yourself.
        # """)

        # Load chain
        self.build_chain()

    def add_persona(self, name: str, role: str, personality: str):
        persona_text = f"""
        You are {name}, your role is {role}.
        Stay strictly in character.
        Your personality is {personality}.
        Only speak as {name}. Do not explain, introduce, or say "here is my response."
        """
        self.persona_text_list.append(SystemMessage(persona_text))

    def build_chain(self):
        prompt = ChatPromptTemplate.from_messages(
            [
                *self.persona_text_list,
                MessagesPlaceholder('history'),
                ('human', '{turn_settings}'),
                ('human', '{user_input}')
            ]
        )

        self.chain = prompt | self.model | StrOutputParser()

    def generate_message(self, input=''):
        '''
        Generates message from user prompt and history.

        Params:
            input (str) - Human user input
        Returns:
            status (str) - Conversation status
            output (str) - Model output for current turn
            session_history (list) - List of the entire conversation
        '''

        prompt = self.session['prompts'][self.i][0]

        # AI turn
        result = self.chain.invoke({
            'turn_settings': f"""
                {prompt}
            """,
            'user_input': f"""
                {HumanMessage(input)}
            """,
            'history': self.session_history
        })

        # Update history
        self.session_history.append(HumanMessage(self.clean_message(input)))
        self.session_history.append(AIMessage(self.clean_message(result)))

        if "<REPEAT>" in result: 
            self.i -= 1
        self.i += 1

        result = self.clean_message(result)
        if self.i > 3:
            return ("<END OF CONVERSATION>", result, self.session_history)
        else:
            return ("<CONTINUE>", result, self.session_history)
        
    def clean_message(self, text):
        try:
            text = ast.literal_eval(text)
        except (ValueError, SyntaxError):
            pass

        # Remove dialogue prefix if exists
        if ':' in text:
            text = text.split(':')[-1]

        # Remove tokens if exists
        text = text.replace("<REPEAT>", "")
        text = text.replace("<CONTINUE>", "")

        # Remove line breaks and backslashes
        text = text.replace("\n", " ")
        text = text.replace("\\", "")

        # Remove unnecesary spaces from start or end
        text = text.strip()

        return text
    

class Evaluator:
    def __init__(self, model):
        self.model = model

    def evaluate(self, session_history):
        '''
        Evaluates the HUMAN's language proficiency in the session history.

        Params:
            session_history (list) - Session history

        Returns:
            evaluation_results (str) - Evaluation results
        '''
        evaluation_prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a strict language proficiency evaluator. "
                    "Evaluate the HUMAN's language proficiency in the conversation. "
                    "Always focus on grammar, vocabulary, fluency, and clarity. "
                    "Give a score from 1–10, and short feedback (2–3 sentences)."
                    "Always use this format when formatting: Grammar: 4.5/10 or Fluency: 8.5/10 for example."),
            ("human", "Conversation:\n{conversation}\n\nNow give your evaluation:")
        ])

        evaluation_chain = LLMChain(
            llm=self.model, 
            prompt=evaluation_prompt
        )

        conversation_text = self.parse_history(session_history)

        evaluation_results = evaluation_chain.invoke({"conversation": conversation_text})['text']
        evaluation_results = self.parse_result(evaluation_results)

        return evaluation_results

    def translate(self, session_history):
        pass

    def parse_history(self, session_history):
        conversation_text = "\n".join([
            f"{m.type.upper()}: {m.content}" for m in session_history[1:]
        ])
        
        return conversation_text
    
    def parse_result(self, result: str):
        pattern = r"(Grammar|Vocabulary|Fluency|Clarity):\s*([\d\.]+)/10\s*(.*?)(?=(Grammar|Vocabulary|Fluency|Clarity|$))"
        matches = re.findall(pattern, result, flags=re.DOTALL)

        evaluation = {}
        for section, score, comment, _ in matches:
            evaluation[section] = {
                "score": float(score),
                "comment": comment.strip()
            }
        return evaluation