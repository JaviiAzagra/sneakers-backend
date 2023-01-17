const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sneakersSchema = new Schema(
  {
    brand: { type: String, required: true, enum: ["Adidas", "Nike", "Balenciaga"] },
    name: { type: String, required: true },
    model: { type: String, required: true },
    img: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const Sneaker = mongoose.model("sneakers", sneakersSchema);

module.exports = Sneaker;
