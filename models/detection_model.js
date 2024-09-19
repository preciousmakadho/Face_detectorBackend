const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetectionSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
}, { timestamps: true });

// Export the model
module.exports = mongoose.model("detections", DetectionSchema);
