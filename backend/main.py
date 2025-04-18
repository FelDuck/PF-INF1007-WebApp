from fastapi import FastAPI, Request
import json
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import jwt
import sqlite3
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials= True,
    allow_methods=['*'],
    allow_headers=['*']
)

class credentials(BaseModel):
    username : str
    password : str
    

    

@app.post('/clients')
async def addClient(Item):
    a = json.load(Item)
    print(a)

@app.post('/auth/login')
async def loginCheck(request: Request):
    #a = json.load(Item)
    #print(a)
    #console.log(request)
    con = sqlite3.connect("routeur.db")
    jsonData = json.dumps(await request.json())
    con.execute("INSERT INTO request(json) values('"+jsonData+"')")
    con.commit()
    
    return { "token":jwt.encode({"aaa":"aa"},"secretkey",algorithm="HS256")}

@app.post('/auth/login HTTP/1.1')
async def loginCheck2(data : credentials):
    #a = json.load(Item)
    #print(a)
    console.log(data)
    return jwt.encode("aaa","secretkey",algorithm="HS256")





