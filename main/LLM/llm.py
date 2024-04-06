import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

google_api_key = os.getenv("API_KEY")

genai.configure(api_key = google_api_key)

def getPromptResponse( prompt, top_p = 0.9, top_k = 1, temp = 0.4):
    """Generate a response based on a user prompt using a generative AI model.

    Args:
        prompt (str): The prompt provided by the user to generate the response.
        top_p (float, optional): A value between 0 and 1 representing the nucleus sampling probability cutoff.
        	Higher values result in more diverse but potentially lower-quality responses. Defaults to 0.9.
        top_k (int, optional): An integer representing the top-k sampling cutoff.
        	Higher values result in more diverse but potentially lower-quality responses. Defaults to 1.
        temperature (float, optional): A value controlling the randomness of the generated responses.
        	Lower values result in more deterministic responses, while higher values result in more diverse
         	but potentially less coherent responses. Defaults to 0.4.

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

    convo = model.start_chat(history=[])

    convo.send_message(prompt)
    # print(convo.last.text)

    return convo.last.text