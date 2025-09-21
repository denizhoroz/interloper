from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_models import ChatLlamaCpp
from langchain_core.messages import SystemMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage
from langchain.chains import LLMChain
import json
import re
import ast

def initialize_model(model_path, n_ctx=2048, n_gpu_layers=-1, n_batch=512, max_tokens=256, temperature=0.7):
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
        self.turns = self.session['turns']

        # Add personality
        self.add_persona(
            name=self.session['talker']['name'],
            role=self.session['talker']['role'],
            personality=self.session['talker']['personality']
        )

        # Load chain
        self.build_chain()

    def add_persona(self, name: str, role: str, personality: str):
        persona_text = f"""
        You are {name}, your role is {role}.
        Stay strictly in character.
        Your personality is {personality}.
        ONLY speak as {name}. Do not explain, introduce, or say "here is my response."
        ONLY follow the specific step given. 
        """
        self.persona_text_list.append(SystemMessage(persona_text))

    def build_chain(self):
        prompt = ChatPromptTemplate.from_messages(
            [
                *self.persona_text_list,
                ('human', '{turn_settings}'),
                MessagesPlaceholder('history'),
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
        if self.i > self.turns:
            return ("<END OF CONVERSATION>", result, self.session_history)
        else:
            return ("<CONTINUE>", result, self.session_history)
        
    def clean_message(self, text):
        # Parse literal text
        try:
            text = ast.literal_eval(text)
        except (ValueError, SyntaxError):
            pass

        # Remove redundant surrounding quotes (single or double)
        if (len(text) >= 2) and (
            (text[0] == text[-1]) and text[0] in ["'", '"']
        ):
            text = text[1:-1].strip()

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

        for section, data in evaluation_results.items():
            if 'comment' in data and isinstance(data['comment'], str):
                data['comment'] = self.clean_evaluation(data['comment'])

        return evaluation_results
    
    def clean_evaluation(self, text):
        # remove surrounding ** markers if they exist
        if text.startswith("**") and text.endswith("**"):
            text = text[2:-2]

        # remove any stray asterisks inside
        text = text.replace("**", "")

        # replace line breaks with spaces
        text = text.replace("\n", " ")

        # normalize multiple spaces to single
        text = " ".join(text.split())

        # strip leading/trailing whitespace
        text = text.strip()

        return text
    
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
    

class Translator:
    def __init__(self, model):
        self.model = model

    def parse_history(self, session_history):
        conversation_text = "\n".join([
            f"{m.type.upper()}: {m.content}" for m in session_history[1:]
        ])

        return conversation_text

    def translate(self, text, lang_to="TR"):
        '''
        Translates the session history to target language.

        Params:
            text - Text to be translated.
            lang_to - Translated language.
        Returns:
            result (str) - Translated text.
        '''

        result = self.model.translate_text(
            text=text, 
            target_lang=lang_to).text
        
        return result
    
    def translate_evaluation(self, eval_results):
        for key, value in eval_results.items():
            eval_results[key]['comment'] = self.translate(text=eval_results[key]['comment'])

        return eval_results