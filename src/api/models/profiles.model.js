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
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, unique: true, trim: true },
    birthDate: { type: Date, required: true },
    user: [{ type: mongoose.Types.ObjectId, ref: "users", required: true }],
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("profiles", profilesSchema);

module.exports = Profile;
