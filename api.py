from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class RegistrationData(BaseModel):
    username: str
    email: str
    password: str

@app.post("/register/")
async def register_user(registration_data: RegistrationData):
    # Simulate storing the user in a database
    print(f"New registration: {registration_data}")
    return {"message": "User registered successfully", "data": registration_data}


if __name__=="__main__":
    print("hi")