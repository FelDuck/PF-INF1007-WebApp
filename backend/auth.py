import jwt
import sqlite3
import datetime as dt

class Authentification:

    def __init__(self):
        self.listeConenxionActive = {}

    def verification_connexion_init(self, email, password):
        stringQuery = 'SELECT * FROM login WHERE email = "{}" AND password ="{}"'.format(email, password)
        con = sqlite3.connect("routeur.db")
        with con:
            curr = con.cursor()
            ans = curr.execute(stringQuery)
            row = ans.fetchone()
            if row is None:
                return False, False
            else:
                if row[2] == 1:
                    return True, True
                else:
                    return True, False

    def attributionCle(self, email):
        token = jwt.encode({"email": '"' + email + '"'}, "secretkey", algorithm="HS256")
        self.listeConenxionActive[token] = [email, dt.datetime.now()]
        return token

    def verification_connexion(self, token):
        con = self.listeConenxionActive.get(token)
        if con is None:
            return False
        delta = dt.datetime.now() - con[1]
        if delta.total_seconds() > 900:
            return False
        con[1] = dt.datetime.now()
        self.listeConenxionActive[token] = con
        return True
