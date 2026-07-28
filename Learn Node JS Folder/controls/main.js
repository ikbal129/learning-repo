//blogs-create-get, blogs-create-post, blogs:id-get, blogs:id-delete
const DBHandle = require("../models/database");
const db = new DBHandle();

const createGet = (req, res) => {
    res.render("create", { title: "Create" });
}

const createPost = (req, res) => {
    const data = req.body;
    db.add(data.title, data.snippet, data.body);
    res.redirect("/")
}

const blogsIdGet = (req, res) => {
    const id = req.params.id;
    db.findByID(id).then(data => {
        res.render("details", { blog: data })
    })
}

const blogsIdDelete = (req, res) => {
    const id = req.params.id;
    db.deleteByID(id);
    res.json({redirect: "/"})
}

module.exports = {
    createGet,
    createPost,
    blogsIdGet,
    blogsIdDelete
}