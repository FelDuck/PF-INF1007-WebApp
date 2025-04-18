import sqlite3

def creation_table():
    con = sqlite3.connect("routeur.db")
    cur = con.cursor()
    res = cur.execute("CREATE TABLE IF NOT EXISTS request(json text)")
    return

#creation_table()
def test():
    con = sqlite3.connect("routeur.db")
    cur = con.cursor()
    #cur.execute("INSERT INTO admin(username,password,status) VALUES ('aaaa','123','admin')")
    #cur.execute("ALTER TABLE admin ADD COLUMN status text")
    
    return

#test()

def printdb():
    con = sqlite3.connect("routeur.db")
    cur = con.cursor()
    for json in cur.execute("SELECT * FROM request"):
        print(json)
        
    """
    res = con.execute("SELECT * FROM request")
    con.commit()
    with con:
        for json in res.fetchone():
           print(json)
    """
    """
    with con:
        con.execute("DELETE FROM request")
        con.commit()

    with con:
        con.close()
        """
printdb()
