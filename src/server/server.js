const path = require("path");
const multer = require("multer");
const uidSafe = require("uid-safe");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8080 } = process.env;
const { fileUpload } = require("./file-upload");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "..", "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152, //2 mb
    },
});

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

app.post("/upload", uploader.single("file"), fileUpload, function (req, res) {
    // If nothing went wrong the file is already in the uploads directory
    console.log("amazon link from server: ", res.locals.fileUrl);
    if (req.file) {
        res.json({
            success: true,
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
