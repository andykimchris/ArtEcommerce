const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ArtWork = require("./models/art-gallery");

const app = express();
dotenv.config()

const dbURI = process.env.CONNECTION_URL
mongoose
  .connect(dbURI)
  .then((_) => {
    app.listen(process.env.PORT || 5000);
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
      console.log("added artwork to mongo")
    })
    .catch((err) => console.log("error saving artwork", err));
});

app.get("/api/get-artworks", (req, res) => {
  ArtWork.find()
    .sort({ name: 1 })
    .then((result) => {
      res.send({ artworks: result });
      console.log("fetched artworks from mongo")
    })
    .catch((err) => {
      console.error(err);
    })
    .catch((err) => console.log("error getting artworks", err));
});
