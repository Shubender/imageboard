const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8080 } = process.env;

const { getAllImg } = require("./db");
let images;

app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
    // res.redirect("/images/");
});

app.get("/images", (req, res) => {
    getAllImg().then((data) => {
        // console.log(data.rows);
        images = data.rows;
        res.json(images);
    });
});





app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));