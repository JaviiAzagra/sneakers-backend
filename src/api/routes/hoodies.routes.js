const express = require("express");
const { uploadFile, deleteFile } = require("../middlewares/cloudinary");
const Hoodie = require("../models/hoodies.model")
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allHoodies = await Hoodie.find();
    return res.status(200).json(allHoodies);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const hoodieToFind = await Hoodie.findById(id);
    return res.status(200).json(hoodieToFind);
  } catch (error) {
    return next(error);
  }
});

router.get('/brand/:brand', async (req, res, next) => {
  try {
      const brand = req.params.brand;
      const hoodieToFind = await Hoodie.find({brand: brand});
      return res.status(200).json(hoodieToFind);
  } catch (error) {
      return next(error);
  }
});

router.post("/create", uploadFile.single("img"), async (req, res, next) => {
  try {
    const hoodie = req.body;
    if (req.file) {
      hoodie.img = req.file.path;
    }
    const newHoodie = new Hoodie(hoodie);
    const created = await newHoodie.save();
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const hoodie = await Hoodie.findById(id);
    if (hoodie.img) {
      deleteFile(hoodie.img);
    }
    const hoodieToDelete = await Hoodie.findByIdAndDelete(id);
    return res.status(200).json(`The 'hoodie' has been deleted --> ${hoodieToDelete}`);
  } catch (error) {
    return next(error);
  }
});

router.put("/edit/:id", uploadFile.single("img"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const hoodieDb = await Hoodie.findById(id);
    if (hoodieDb.img) {
      deleteFile(hoodieDb.img);
    }
    const hoodie = req.body;
    if (req.file) {
      hoodie.img = req.file.path;
    }
    const hoodieModify = new Hoodie(hoodie);
    hoodieModify._id = id;
    const hoodieUpdated = await Hoodie.findByIdAndUpdate(id, hoodieModify);
    return res.status(200).json(`Successfully updated --> ${hoodieUpdated}`);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;