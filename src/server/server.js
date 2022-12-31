const path = require("path");
const multer = require("multer");
const uidSafe = require("uid-safe");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8080 } = process.env;
const { fileUpload } = require("./file-upload");
const { getAllImg, addImg, getImageById } = require("./db");
let images;
let imageId;

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
    // console.log("amazon link from server: ", res.locals.fileUrl);
    // console.log("user input (server): ", req.body.filename, req.body.description, req.body.username);

    const imgUrl = res.locals.fileUrl;
    const username = req.body.username;
    const filename = req.body.filename;
    const description = req.body.description;
    addImg(imgUrl, username, filename, description).then((data) => {
        if (req.file) {
            console.log("User data (server): ", data.rows[0]);
            res.json({
                success: true,
                userFile: data.rows[0],
            });
        } else {
            res.json({
                success: false,
            });
        }
    });
});

app.get("/image/:id", (req, res) => {
    imageId = req.params.id;
    // console.log("imageId (server): ", imageId);
    getImageById(imageId).then((data) => {
        res.json(data.rows[0]);
    });
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
