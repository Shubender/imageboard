require("dotenv").config();
const { DATABASE_URL } = process.env;
const spicedPg = require("spiced-pg");
const db = spicedPg(DATABASE_URL);

module.exports.getAllImg = () => {
    return db.query(`
    SELECT * FROM images
    ORDER BY created_at DESC
    `);
};

module.exports.addImg = (url, username, title, description) => {
    return db.query(
        `INSERT INTO images (url, username, title, description)
         VALUES ($1, $2, $3, $4) RETURNING *;`,
        [url, username, title, description]
    );
};

module.exports.getImageById = (imageId) => {
    return db.query(
        `SELECT * FROM images
        WHERE id = $1;`,
        [imageId]
    );
};

module.exports.addComment = (imageId, username, comment) => {
    return db.query(
        `INSERT INTO comments (id_image, username, comment) 
         VALUES ($1, $2, $3) RETURNING *;`,
        [imageId, username, comment]
    );
};

module.exports.getCommentsByImageId = (imageId) => {
    return db.query(
        `SELECT * FROM comments
        WHERE id_image = $1
        ORDER BY created_at DESC`,
        [imageId]
    );
};
