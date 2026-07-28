const express = require("express");
const morgan = require("morgan");
const create = require("./routers/blogRoutes")
const port = 3000;
const DBHandle = require("./models/database");

const db = new DBHandle();

const app = express();

app.listen(port);

app.set("view engine", "ejs");

// middleware

app.use(express.static("public"));
app.use(morgan("dev"))
app.get("/", (req, res) => {
    db.getData().then(data => {
        res.render("index", { title: "Home", blog: data });
    }).catch(err => {
        res.render("index")
    })
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
})

app.get("/about-us", (req, res) => {
    res.redirect("/about");
})



app.use("/blogs", create)

app.use((req, res) => {
    res.statusCode = 404;
    res.render("404", { title: "404" })
})