const sqlite3 = require("sqlite3").verbose();
const path = require("path");
let sql;

class DB_Handler {
    constructor() {
        const dbPath = path.join(__dirname, 'blogs.db');
        this.db = new sqlite3.Database(dbPath,sqlite3.OPEN_READWRITE, (err) => {
            if (err) console.log(err);
        });
    }

    create() {
        sql = "CREATE TABLE IF NOT EXISTS blog(id TEXT PRIMARY KEY, title, snippet, body)";
        this.db.run(sql, (err) => {
            if (err) return console.error(err)
        });
    }

    add(title, snippet, body) {
        const id = crypto.randomUUID();
        sql = "INSERT INTO blog(id, title, snippet, body) VALUES(?,?,?,?)";
        this.db.run(sql, [id, title, snippet, body], (err) => {
            if (err) return console.error(err.message);

            console.log("berhasil")
        })
    }

    getData() {
        return new Promise((resolve, reject) => {
            sql = 'SELECT * FROM blog';
            this.db.all(sql, [], (err, data) => {
                if (err) reject(err);

                resolve(data)
            })
        })
    }

    findByID(id) {
        return new Promise((resolve, reject) => {
            sql = "SELECT * FROM blog WHERE id=?";
            this.db.get(sql, [id], (err, data) => {
                if (err) reject(err);

                resolve(data);
            })
        })
    }

    deleteByID(id) {
        sql = "DELETE FROM blog WHERE id=?";
        this.db.run(sql, [id], (err) => {
            if (err) return console.error(err)
        })
    }

    dropTable() {
        this.db.run("DROP TABLE blog")
    }
}

// const db = new DB_Handler();
// db.dropTable()
// db.create();

module.exports = DB_Handler