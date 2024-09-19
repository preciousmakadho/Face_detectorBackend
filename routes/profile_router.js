const express = require("express");
const router = express.Router();
const ProfileModel = require("../models/profile_model");

router.get("/getAllProfiles", async (req, res) => {
  try {
    const profiles = await ProfileModel.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/create", async (req, res) => {
  const profile = new ProfileModel(req.body);
  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





module.exports = router;
