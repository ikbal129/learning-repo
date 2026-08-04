const sqlite = require("node:sqlite");
const path = require("path")

class DATABASE_HANDLE {
    constructor () {
        this.db = new sqlite.DatabaseSync(path.join(__dirname, "notes.db"));
    }

    createTable() {
        this.db.exec(`CREATE TABLE IF NOT EXISTS notes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            category TEXT NOT NULL)`)
    }

    insertData(data) {
        const { title, content, category } = data;
        const insertUser = this.db.prepare("INSERT INTO notes (title, content, category) VALUES(?, ?, ?)");
        insertUser.run(title, content, category);

        console.log("berhasil")
    }

    selectAllData() {
        const getData = this.db.prepare("SELECT * FROM notes").all();
        return getData
    }

    updateData(id, data) {
        const { title, content, category } = data;
        const updateNotes = this.db.prepare(`UPDATE notes SET title=?, content=?, category=? WHERE id=?`);
        updateNotes.run(title, content, category, id);
        
        console.log("berhasil up to date")
    }

    deleteData(id) {
        const deleteNotes = this.db.prepare("DELETE FROM notes WHERE id=?");
        deleteNotes.run(id);

        console.log("berhasil hapus data")
    }
}

module.exports = DATABASE_HANDLE