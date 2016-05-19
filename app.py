import codecs, json, os, time, sqlite3
from os import path

from flask import Flask, abort, current_app
DB_URI = 'file:%s?mode=memory&cache=shared' % time.time()
app = Flask(__name__)

DEFAULT_FORTUNES = [
    '/usr/local/share/games/fortunes/',
    '/usr/share/games/fortunes/',
]

def get_db():
    return sqlite3.connect(DB_URI)

def init_db():
    db = get_db()
    c = db.cursor()
    query = """CREATE TABLE IF NOT EXISTS fortunes (
        id int primary key,
        body text,
        offensive boolean,
        custom boolean DEFAULT 0
    )"""
    c.execute(query)
    db.commit()
    return db

def read_fortunes(db):
    print("Reading fortunes...")
    for fortunes_dir in DEFAULT_FORTUNES:
        if path.exists(fortunes_dir) and path.isdir(fortunes_dir):
            break
    else:
        print("No fortunes dir found.")
        return

    fortunes = [] # (text, offensive)
    for fname in os.listdir(fortunes_dir):
        fullpath = path.join(fortunes_dir, fname)
        if fullpath.endswith(".dat") or not path.isfile(fullpath):
            continue
        fortunes += [(x.strip(), False) for x in open(fullpath).read().split("%")]

    off_fortunes = path.join(fortunes_dir, 'off')
    if path.exists(off_fortunes) and path.isdir(off_fortunes):
        for fname in os.listdir(off_fortunes):
            fullpath = path.join(off_fortunes, fname)
            if fullpath.endswith(".dat") or not path.isfile(fullpath):
                continue
            fortunes += [(codecs.encode(x.strip(), 'rot13'), True)
                for x in open(fullpath).read().split("%")]

    query = "INSERT INTO fortunes(body, offensive) VALUES (?, ?)"
    c = db.cursor()
    c.executemany(query, fortunes)
    db.commit()
    print("Read %s fortunes." % len(fortunes))


@app.route("/")
def hello():
    return open('templates/index.html').read()

@app.route("/app/<path:js_path>")
def get_app_js(js_path):
    js_path = "app/" + js_path
    if not path.exists(js_path):
        print("does not exist", js_path)
        abort(404)
    return open(js_path).read()

@app.route("/get_fortune/", defaults={"clean_humor": False})
@app.route("/get_fortune/<clean_humor>")
def get_fortune(clean_humor):
    print("clean:", clean_humor)
    query = """SELECT body, offensive, custom FROM fortunes
            WHERE (?)=0 or NOT offensive
            ORDER BY RANDOM() LIMIT 1;"""
    c = get_db().cursor()
    c.execute(query, (bool(clean_humor),))
    body, offensive, custom = c.fetchone()
    result = {"body": body, "offensive": bool(offensive), "custom": bool(custom)}
    return json.dumps(result)

if __name__ == "__main__":
    app.debug = True
    app.db = init_db()
    read_fortunes(app.db)
    app.run()
