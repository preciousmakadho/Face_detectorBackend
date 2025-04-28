const mongoose = require("mongoose")

const attendanceSchema = new mongoose.Schema(
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
    date: {
      type: String, // Store as YYYY-MM-DD format
      required: true,
    },
    checkInTime: {
      type: String, // Store as HH:MM format
    },
    checkOutTime: {
      type: String, // Store as HH:MM format
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late", "Completed"],
      default: "Present",
    },
  },
  {
    timestamps: true,
  },
)

// Create a compound index to ensure one record per employee per day
attendanceSchema.index({ profileId: 1, date: 1 }, { unique: true })

module.exports = mongoose.model("Attendance", attendanceSchema)
