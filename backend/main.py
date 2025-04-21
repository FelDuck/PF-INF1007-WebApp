from fastapi import FastAPI, Request
import json
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import jwt
import sqlite3
import datetime as dt
from auth import Authentification



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials= True,
    allow_methods=['*'],
    allow_headers=['*']
)

authe = Authentification()
@app.get('/clients')
async def addClient(request: Request):
    jsonData = request.headers
    token = jsonData["Authorization"]
    authe.verification_connexion(token)
    con = sqlite3.connect("routeur.db")
    cur = con.cursor()
    c_id = c_name = "["
    for row in cur.execute("SELECT rowid,name FROM Client"):
        c_id = c_id + row[0]
        c_name = c_name +'"'+ row[1] + '"'

    c_id = c_id + "]"
    c_name = c_name + "]"

    return '{"id":'+ c_id+',"name":'+c_name+'}'
        
    

@app.post('/auth/login')
async def loginCheck(request: Request):
    """
    jsonData = json.dumps(await request.json())    
    send_text(jsonData["email"]) 
    """
    jsonData = await request.json()
    email = jsonData["email"]
    password = jsonData["password"]
 
 
 
    verif,priv = authe.verification_connexion_init(email,password)
    if verif:
        return {"token":authe.attributionCle(email)}
    else:
        return
 
"""
@app.post('/auth/login HTTP/1.1')
async def loginCheck2(data : credentials):
    #a = json.load(Item)
    #print(a)
    console.log(data)
    return jwt.encode("aaa","secretkey",algorithm="HS256")
"""


def send_text(text):
    con = sqlite3.connect("routeur.db")

    con.execute("INSERT INTO request(json) values('"+text+"')")
    con.commit()


       
class administrateur:
    
    def __init__():
        null
    def creation_client(email,password,priviledge):
        null
        
    def creation_decodeur():
        null
    def modif_client():
        null
    def modif_decodeur():
        null

class ControlleurClient():

    def __init__():
        null
    def verification_cle():
        null
    def accesseur_client():
        null
    def mutateur_client():
        null

class clients():

    def __init__():
        null
    def receveur_notif():
        null
    def accesseur_liste_decodeur():
        null
    
