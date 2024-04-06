import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv
load_dotenv()

path = os.path.dirname(os.path.abspath(__file__))




def get_vector_database():
    chunks = []
    with open(os.path.join(path, "Chapter2.txt"), 'r', encoding='utf-8') as file:
            content = file.read()
            paragraphs = content.split(" \n\n\n")
            chunks += paragraphs

    with open(os.path.join(path, "Chapter3.txt"), 'r', encoding='utf-8') as file:
            content = file.read()
            paragraphs = content.split("\n\n\n")
            chunks += paragraphs
  
    embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001", google_api_key=os.getenv("API_KEY"))
    vector_store = FAISS.from_texts(chunks, embedding=embeddings)
    return vector_store

if __name__=="__main__":
    val = get_vector_database()
    print(val.similarity_search("sand", k=10))