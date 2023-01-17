const express = require("express");
const { uploadFile, deleteFile } = require("../middlewares/cloudinary");
const Sneaker = require("../models/sneakers.model")
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allSneakers = await Sneaker.find();
    return res.status(200).json(allSneakers);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const sneakerToFind = await Sneaker.findById(id);
    return res.status(200).json(sneakerToFind);
  } catch (error) {
    return next(error);
  }
});

router.get('/brand/:brand', async (req, res, next) => {
  try {
      const brand = req.params.brand;
      const sneakerToFind = await Sneaker.find({brand: brand});
      return res.status(200).json(sneakerToFind);
  } catch (error) {
      return next(error);
  }
});

router.post("/create", uploadFile.single("img"), async (req, res, next) => {
  try {
    const sneaker = req.body;
    if (req.file) {
      sneaker.img = req.file.path;
    }
    const newSneaker = new Sneaker(sneaker);
    const created = await newSneaker.save();
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const sneaker = await Sneaker.findById(id);
    if (sneaker.img) {
      deleteFile(sneaker.img);
    }
    const sneakerToDelete = await Sneaker.findByIdAndDelete(id);
    return res.status(200).json(`The 'sneaker' has been deleted --> ${sneakerToDelete}`);
  } catch (error) {
    return next(error);
  }
});

router.put("/edit/:id", uploadFile.single("img"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const sneakerDb = await Sneaker.findById(id);
    if (sneakerDb.img) {
      deleteFile(sneakerDb.img);
    }
    const sneaker = req.body;
    if (req.file) {
      sneaker.img = req.file.path;
    }
    const sneakerModify = new Sneaker(sneaker);
    sneakerModify._id = id;
    const sneakerUpdated = await Sneaker.findByIdAndUpdate(id, sneakerModify);
    return res.status(200).json(`Successfully updated --> ${sneakerUpdated}`);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;