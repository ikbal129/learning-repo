const express = require("express");
const router = express.Router();
const controls = require("../controls/main");

router.use(express.urlencoded({extended: true}))

router.route("/create").get(controls.createGet).post(controls.createPost)

router.route("/:id").get(controls.blogsIdGet).delete(controls.blogsIdDelete)

module.exports = router