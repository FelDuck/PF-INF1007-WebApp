from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from auth import Authentification
import httpx
import json


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

authe = Authentification()

@app.post('/auth/login')
async def loginCheck(request: Request):
    jsonData = await request.json()
    email = jsonData.get("email")
    password = jsonData.get("password")

    verif, priv = authe.verification_connexion_init(email, password)
    if not verif:
        raise HTTPException(status_code=401, detail="Identifiants invalides")

    token = authe.attributionCle(email)

    if priv:
        return {"token": token, "id": None}

    con = sqlite3.connect("routeur.db")
    cur = con.cursor()
    c_id = cur.execute("SELECT rowid FROM Client WHERE email = ?", (email,)).fetchone()
    con.close()

    if c_id is None:
        raise HTTPException(status_code=404, detail="Client introuvable")

    return {"token": token, "id": c_id[0]}

@app.post('/clients/get')
async def getClient(request: Request):
    token = request.headers.get("Authorization")
    if not token or not authe.verification_connexion(token):
        raise HTTPException(status_code=401, detail="Accès non autorisé")

    con = sqlite3.connect("routeur.db")
    cur = con.cursor()

    query = []
    for row in cur.execute("SELECT rowid, name FROM Client"):
        query.append({"id": row[0], "name": row[1]})

    return query

@app.post('/clients')
async def addClient(request: Request):
    jsonData = await request.json()
    con = sqlite3.connect("routeur.db")
    query = 'INSERT INTO Client(name) VALUES(?)'
    with con:
        con.execute(query, (jsonData["name"],))
        con.commit()
    return {"message": "Client ajouté avec succès"}

@app.delete('/clients/{c_id}')
async def deleteClient(c_id: int):
    con = sqlite3.connect("routeur.db")
    query = "DELETE FROM Client WHERE rowid = ?"
    with con:
        con.execute(query, (c_id,))
        con.commit()
    return {"message": "Client supprimé"}

@app.get("/clients/{client_id}/decoders")
async def get_decoders(client_id: int):
    apiurl = "https://wflageol-uqtr.net/decoder"
    query = f'SELECT Decodeur_id FROM decodeur WHERE Client_id = {client_id}'
    return_dicts = []
    id_list = []
    
    con = sqlite3.connect("routeur.db")
    cur = con.cursor()
    rows = cur.execute(query).fetchall()
    con.close()
    for row in rows:
        id_list.append(row[0])
        
    con.close()
    
    async with httpx.AsyncClient() as client:

        for d_id in id_list:
            sd_id = str(d_id)
            #qdata = f'"id":"THEF04039901","address":"127.0.10.{sd_id},"action":"info"'
            #qdata = '{'+qdata+'}'
            qdata = json.dumps({"id":"THEF04039901","address":f"127.0.10.{sd_id}","action":"info"})
            response = await client.post(apiurl,data =qdata)

            
            datajson = response.json()
            if datajson["response"] != "OK":
                raise HTTPException(status_code=401, detail=f"Something is messed up, id:{sd_id}, data={qdata},datajson= {json.dumps(datajson)}")
            return_dicts.append({"id":d_id,"status":datajson["state"]})
            
                


        return return_dicts
@app.delete("/clients/{client_id}/decoders/{decoder_id}")
async def deletedecodeur(client_id: int,decoder_id: int):
    query = f"DELETE FROM Decodeur WHERE Client_id = {client_id} AND Decodeur_id = {decoder_id}"
    con = sqlite3.connect("routeur.db")
    con.execute(query)
    con.commit()
    return {"message": "Decodeur supprimé"}

@app.post("/decoders/{decoder_id}/restart")
async def restart_decodeur(decoder_id:int):
    apiurl = "https://wflageol-uqtr.net/decoder"
    qdata = json.dumps({"id":"THEF04039901","address":f"127.0.10.{decoder_id}","action":"reset"})
    async with httpx.AsyncClient() as client:
        response = await client.post(apiurl,data =qdata,timeout = None)
        datajson = response.json()
        if datajson["response"] != "OK":
                raise HTTPException(status_code=401, detail=f"Something is messed up data={qdata},datajson= {json.dumps(datajson)}")
        return datajson

@app.post("/decoders/{decoder_id}/shutdown")
async def shutdown_decodeur(decoder_id:int):
    apiurl = "https://wflageol-uqtr.net/decoder"
    qdata = json.dumps({"id":"THEF04039901","address":f"127.0.10.{decoder_id}","action":"shutdown"})
    async with httpx.AsyncClient() as client:
        response = await client.post(apiurl,data =qdata,timeout = None)
        datajson = response.json()
        if datajson["response"] != "OK":
                raise HTTPException(status_code=401, detail=f"Something is messed up data={qdata},datajson= {json.dumps(datajson)}")
        return datajson

@app.post("/decoders/{decoder_id}/reinit")
async def reinit_decodeur(decoder_id:int):
    apiurl = "https://wflageol-uqtr.net/decoder"
    qdata = json.dumps({"id":"THEF04039901","address":f"127.0.10.{decoder_id}","action":"reinit"})
    async with httpx.AsyncClient() as client:
        response = await client.post(apiurl,data =qdata,timeout = None)
        datajson = response.json()
        if datajson["response"] != "OK":
                raise HTTPException(status_code=401, detail=f"Something is messed up data={qdata},datajson= {json.dumps(datajson)}")
        return datajson
 

