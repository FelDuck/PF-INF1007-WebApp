import sqlite3

def init_db():
    con = sqlite3.connect("routeur.db")
    cur = con.cursor()

    # Créer les tables si elles n'existent pas
    cur.execute("""
        CREATE TABLE IF NOT EXISTS login (
            email TEXT PRIMARY KEY,
            password TEXT,
            priviledge INTEGER
        )
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS Client (
            name TEXT,
            email TEXT
        )
    """)

    # Données de test
    cur.execute("INSERT OR IGNORE INTO login(email, password, priviledge) VALUES (?, ?, ?)", 
                ("admin@admin.com", "admin", 1))  # admin
    cur.execute("INSERT OR IGNORE INTO login(email, password, priviledge) VALUES (?, ?, ?)", 
                ("user@client.com", "123", 0))    # client
    cur.execute("INSERT OR IGNORE INTO Client(name, email) VALUES (?, ?)", 
                ("Client 1", "user@client.com"))

        # Table pour les décodeurs
    cur.execute("""
        CREATE TABLE IF NOT EXISTS Decodeur (
            nom TEXT,
            status TEXT,
            client_id INTEGER
        )
    """)

    # Données de test
    cur.execute("INSERT INTO Decodeur(nom, status, client_id) VALUES (?, ?, ?)", ("Décodeur 1", "actif", 1))
    cur.execute("INSERT INTO Decodeur(nom, status, client_id) VALUES (?, ?, ?)", ("Décodeur 2", "inactif", 1))


    con.commit()
    con.close()
    print("✅ Base de données initialisée avec succès.")

if __name__ == "__main__":
    init_db()
