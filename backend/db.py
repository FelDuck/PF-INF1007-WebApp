import sqlite3

def creation_table():
    con = sqlite3.connect("routeur.db")
    cur = con.cursor()
    res = cur.execute("CREATE TABLE IF NOT EXISTS request(json text)")
    cur.execute("CREATE TABLE IF NOT EXISTS login(email text,password text,priviledge integer)")
    cur.execute("CREATE TABLE IF NOT EXISTS Client(name text)")
    return


def test(text):
    con = sqlite3.connect("routeur.db")
    cur = con.cursor()
    #con.execute(text)
    #con.commit()
    #cur.execute("INSERT INTO admin(username,password,status) VALUES ('aaaa','123','admin')")
    cur.execute("INSERT INTO Client(name) VALUES('Felix')")
    """
    ans = cur.fetchone()
    print(ans)
    print("********************************")
    print(type(ans))
    """
    return


#test("DELETE from login where rowid = 2")
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
#printdb()
test("")
#creation_table()
