import os
from dotenv import load_dotenv
import google.generativeai as genai
import database

load_dotenv()

google_api_key = os.getenv("API_KEY")

genai.configure(api_key = google_api_key)

def getPromptResponse( prompt, top_p = 0.9, top_k = 1, temp = 0.4):
    """ Generate a response based on a user prompt using a generative AI model.

        Returns:
            str: The generated response based on the user prompt.
    """

    generation_config = {
      "temperature": temp,
      "top_p": top_p,
      "top_k": top_k,
      "max_output_tokens": 2048,
    }

    safety_settings = [
      {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
    ]

    model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                  generation_config=generation_config,
                                  safety_settings=safety_settings)

    response = model.generate_content(prompt)

    return response

def getChatResponse( prompt, top_p = 0.9, top_k = 1, temp = 0.4, history = []):
    """ Generate a response based on a user prompt using a generative AI model
        given the chat history.

        Returns: tuple containing prompt response and updated chat history.
    """

    generation_config = {
      "temperature": temp,
      "top_p": top_p,
      "top_k": top_k,
      "max_output_tokens": 2048,
    }

    safety_settings = [
      {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
    ]

    model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                  generation_config=generation_config,
                                  safety_settings=safety_settings)

    convo = model.start_chat(history = history)
    convo.send_message(prompt)

    response = convo.last.text

    return response, convo.history

def chat(user_id, chat_id, prompt):
    if( chat_id == None ):
        response, history = getChatResponse( prompt )
        topic = getChatTopic( prompt )
        database.insert_into_history_table( user_id, topic, history)
    else:
        history = database.getChatHistory( chat_id, user_id)
        response, history = getChatResponse( prompt, history = history)
        database.update_chat_history( chat_id, user_id, history)
    return response

def getChatTopic( first_prompt ):
    prompt = f"""Generate a concise and appropriate topic for this user prompt: "{first_prompt}" within 20 characters.
				Enclose the topic within '$$$$' and '$$$$' as start and end markers.
    			Output format: $$$$ topic string $$$$"""
    response = getPromptResponse(prompt, temp=0.7)

    start_marker = '$$$$'
    end_marker = '$$$$'

    start_index = response.find(start_marker)
    end_index = response.find(end_marker, start_index + len(start_marker))

    topic = response[start_index + len(start_marker):end_index].strip()

    return topic