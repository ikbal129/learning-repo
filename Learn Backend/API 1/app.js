const express = require("express");

const DATABASE_HANDLE = require("./models/databse");

const db = new DATABASE_HANDLE();

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send([1,2,3]);
})

app.get("/api/v1/notes", (req, res) => {
    res.status(200).json(db.selectAllData())
})

app.get("/api/v1/notes/:id", (req, res) => {
    const noteId = Number(req.params.id);
    const noteData = db.selectAllData().find(n => noteId == n.id);

    if (isNaN(noteId)) {
        return res.json({
            success: false,
            message: "ID WAJIB BERUPA ANGKA"
        })
    }

    if (!noteData) {
        res.status(404).send({
            "success": false,
            "message":  `Note with ID ${noteId} not found`
        });
        return;
    }
    res.status(200).json(noteData)
})

app.post("/api/v1/notes", (req, res) => {
    const getData = req.body;

    if (Object.keys(getData).length == 0) {
        res.status(400).json({
            "success": false,
            "message": "Request body cannot be empty. Required fields: title, content, category."
        });
        return;
    }

    const { title, content, category } = req.body;

    const newData = {
        "title": title,
        "content": content,
        "category": category,
    }

    db.insertData(newData)
    res.send({
        "success": true,
        "message": "Note created successfully",
        "data": newData
    })
})

app.put("/api/v1/notes/:id", (req, res) => {
    // if no request
    const data = req.body;
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.json({
            success: false,
            message: "ID WAJIB BERUPA ANGKA"
        });
    }

    const note = db.selectAllData().find(n => n.id == id);

    if (!note) {
        res.status(404).send({
            "success": false,
            "message":  `Note with ID ${id} not found`
        });
        return;
    }
    
    db.updateData(id, data)

    res.status(200).send({
        "success": true,
        "message": "Note updated successfully",
        "data": db.selectAllData()[id - 1]
    })
})

app.delete("/api/v1/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.json({
            success: false,
            message: "ID WAJIB BERUPA ANGKA"
        });
    }

    const note = db.selectAllData().find(n => n.id == id);

    if (!note) {
        res.status(404).send({
            "success": false,
            "message":  `Note with ID ${id} not found`
        });
        return;
    }

    db.deleteData(id)

    res.status(200).json({
        "success": true,
        "message": "Note deleted successfully",
        "data": note
    })
})

app.listen(5500, () => {
    console.log("listening on port 3000")
})