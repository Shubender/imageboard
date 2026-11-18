# Imageboard

A photo-sharing application built during the SPICED Academy web-development bootcamp. Visitors can browse images, open an image detail view, and add comments.

## Features

- Upload an image with a username, title, and description.
- Store image files in S3 and metadata in PostgreSQL.
- Open image details in a modal and display associated comments.
- Add comments and load additional images.
- Backend endpoint for image deletion.

## Stack

Vue through the bundled browser script, JavaScript, Express, PostgreSQL, Multer, and AWS SDK v2/S3. The frontend is served directly by Express, without a separate frontend build step.

## Local setup

Requirements: Node.js/npm, PostgreSQL with `psql`, and an S3 development bucket. The manifest records Node 14.20.1; compatibility with a supported runtime should be checked when restoring the app.

```bash
git clone https://github.com/Shubender/imageboard.git
cd imageboard
npm ci
createdb imageboard
psql -d imageboard -f src/sql/images.sql
```

Use a fresh local database: the schema contains destructive setup statements and is not a repeatable migration. Create a root `.env`:

```dotenv
PORT=8080
DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/imageboard
AWS_KEY=your-access-key
AWS_SECRET=your-secret-key
AWS_BUCKET=your-development-bucket
```

```bash
node src/server/server.js
```

Open `http://localhost:8080`. Use the direct Node command because the current `npm start` calls `nodemon`, which is not declared in the package manifest. Uploads need valid AWS permissions and bucket access appropriate to the app's generated image URLs. Old sample image URLs may no longer resolve.

## Code guide

- [Frontend](src/client/js/app.js) and [detail modal](src/client/js/modal/modal.js)
- [Express endpoints](src/server/server.js), [queries](src/server/db.js), and [file uploads](src/server/file-upload.js)
- [Database schema](src/sql/images.sql)

## Project status

A bootcamp project. There is no user-account or ownership system protecting image changes, and no working automated test command is configured. Full startup, external images, and S3 uploads have not been revalidated for this documentation update.
