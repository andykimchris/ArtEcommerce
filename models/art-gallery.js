const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artWorkSchema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    currency: String,
    image: {
      src: String,
      alt: String,
    },
    bestseller: Boolean,
    featured: Boolean,
    details: {
      dimentions: {
        width: Number,
        height: Number,
      },
      size: Number,
      description: String,
      recommendations: [
        {
          src: String,
          alt: String,
        },
        {
          src: String,
          alt: String,
        },
        {
          src: String,
          alt: String,
        },
      ],
    },
  },
  { timestamps: true }
);

const ArtWork = mongoose.model("ArtWork", artWorkSchema);
module.exports = ArtWork;
