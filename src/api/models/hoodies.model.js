const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hoodiesSchema = new Schema(
  {
    brand: { type: String, required: true},
    model: { type: String, required: true },
    collaboration: { type: String},
    price: { type: Number, required: true},
    img: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const Hoddie = mongoose.model("hoodies", hoodiesSchema);

module.exports = Hoddie;