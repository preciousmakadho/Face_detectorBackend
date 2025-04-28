// 



const mongoose = require("mongoose")

const detectionSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    department: {
      type: String,
    },
    position: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late", "Checked Out", "Done for today", "failed"],
      default: "Present",
    },
    checkType: {
      type: String,
      enum: ["in", "out", "info"],
      default: "in",
    },
    checkInTime: {
      type: String,
    },
    checkOutTime: {
      type: String,
    },
    timestamp: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Detection", detectionSchema)