from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from auth import Authentification

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
    con = sqlite3.connect("routeur.db")
    cur = con.cursor()
    rows = cur.execute(
        "SELECT rowid, nom, status FROM Decodeur WHERE client_id = ?",
        (client_id,)
    ).fetchall()
    con.close()

    return [
        {
            "id": row[0],
            "nom": row[1],
            "status": row[2]
        } for row in rows
    ]
