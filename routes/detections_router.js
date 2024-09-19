const express = require("express");
const router = express.Router();
const DetectionsMOdel = require("../models/detection_model");

router.get("/getAllDetections", async (req, res) => {
  try {
    const detections = await DetectionsMOdel.find();
    res.json(detections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/create", async (req, res) => {
  const detection = new DetectionsMOdel(req.body);
  try {
    const newDetection = await detection.save();
    res.status(201).json(newDetection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





module.exports = router;
