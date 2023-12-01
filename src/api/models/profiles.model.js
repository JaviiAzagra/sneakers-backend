const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profilesSchema = new Schema(
  {
    img: { type: String, required: true, trim: true },
    genre: {
      type: String,
      required: true,
      trim: true,
      enum: ["undefined", "male", "female"],
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("profiles", profilesSchema);

module.exports = Profile;
