// const express = require("express");
// const router = express.Router();
// const DetectionsMOdel = require("../models/detection_model");

// router.get("/getAllDetections", async (req, res) => {
//   try {
//     const detections = await DetectionsMOdel.find();
//     res.json(detections);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post("/create", async (req, res) => {
//   const detection = new DetectionsMOdel(req.body);
//   try {
//     const newDetection = await detection.save();
//     res.status(201).json(newDetection);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });





// module.exports = router;
const express = require("express")
const router = express.Router()
const DetectionsMOdel = require("../models/detection_model")

router.get("/getAllDetections", async (req, res) => {
  try {
    const detections = await DetectionsMOdel.find()
    res.json(detections)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get("/getAll", async (req, res) => {
  try {
    const detections = await DetectionsMOdel.find().sort({ createdAt: -1 })
    res.json(detections)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get detections by profile ID
router.get("/getByProfileId/:profileId", async (req, res) => {
  try {
    const profileId = req.params.profileId
    const detections = await DetectionsMOdel.find({ profileId: profileId }).sort({ createdAt: -1 })
    res.json(detections)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// Add route to update an existing detection (for check-out)
router.patch("/update/:id", async (req, res) => {
  try {
    const detectionId = req.params.id
    console.log(`Updating detection with ID: ${detectionId}`, req.body)
    
    const updatedDetection = await DetectionsMOdel.findByIdAndUpdate(
      detectionId,
      req.body,
      { new: true } // Return the updated document
    )
    
    if (!updatedDetection) {
      return res.status(404).json({ error: "Detection record not found" })
    }
    
    console.log("Detection updated successfully:", updatedDetection)
    res.status(200).json(updatedDetection)
  } catch (err) {
    console.error("Error updating detection:", err)
    res.status(500).json({ message: err.message })
  }
})

// Get today's detections
router.get("/getToday", async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const detections = await DetectionsMOdel.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    }).sort({ createdAt: -1 })

    res.json(detections)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Add a new endpoint to get detections by profile ID and date
router.get("/getByProfileIdAndDate/:profileId/:date", async (req, res) => {
  try {
    const { profileId, date } = req.params
    console.log(`Getting detections for profile ${profileId} on date ${date}`)

    // Create date objects for the start and end of the specified date
    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)

    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)

    console.log(`Date range: ${startDate.toISOString()} to ${endDate.toISOString()}`)

    // Find all detections for this profile on this date
    const detections = await DetectionsMOdel.find({
      profileId: profileId,
      $or: [
        // Check createdAt field
        {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        // Also check timestamp field if it exists
        {
          timestamp: {
            $gte: startDate.toISOString(),
            $lte: endDate.toISOString(),
          },
        },
      ],
    }).sort({ createdAt: -1 })

    console.log(`Found ${detections.length} detections`)

    res.json(detections)
  } catch (err) {
    console.error("Error in getByProfileIdAndDate:", err)
    res.status(500).json({ message: err.message })
  }
})

router.post("/create", async (req, res) => {
  try {
    console.log("Creating new detection:", req.body)

    // Ensure timestamp is set if not provided
    const detectionData = {
      ...req.body,
      timestamp: req.body.timestamp || new Date().toISOString(),
    }

    const detection = new DetectionsMOdel(detectionData)
    const newDetection = await detection.save()

    console.log("Detection created successfully:", newDetection)
    res.status(201).json(newDetection)
  } catch (err) {
    console.error("Error creating detection:", err)
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
