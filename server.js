const express = require("express");
const mongoose = require("mongoose");
const ArtWork = require("./models/art-gallery");
const app = express();

const dbURI =
  "mongodb+srv://andykim:15040mhs@graphql-books.ty1qd.mongodb.net/art-gallery?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((_) => {
    app.listen(5000);
    console.log("connected to db");
  })
  .catch((err) => console.log("error connecting to db", err));

// Process request body as json
app.use(express.json());

app.post("/api/add-artwork", (req, res) => {
  const art_piece = new ArtWork(req.body);
  art_piece
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log("error saving artwork", err));
});

app.get("/api/get-artworks", (req, res) => {
  ArtWork.find()
    .sort({ name: 1 })
    .then((result) => {
      res.send({ artworks: result });
    })
    .catch((err) => {
      console.error(err);
    })
    .catch((err) => console.log("error getting artworks", err));
});
