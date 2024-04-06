import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.vectorstores import FAISS

path = os.path.dirname(os.path.abspath(__file__))


chunks = []


def get_vector_database():
    with open(os.path.join(path, "Chapter2.txt"), 'r', encoding='utf-8') as file:
            content = file.read()
            paragraphs = content.split(" \n\n\n")
            chunks += paragraphs

    with open(os.path.join(path, "Chapter3.txt"), 'r', encoding='utf-8') as file:
            content = file.read()
            paragraphs = content.split("\n\n\n")
            chunks += paragraphs
  
    embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
    vector_store = FAISS.from_texts(chunks, embedding=embeddings)
    return vector_store

