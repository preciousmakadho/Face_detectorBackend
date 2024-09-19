const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  profileId: String,
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  address: String
}, { timestamps: true });

// Export the model
module.exports = mongoose.model("profiles", ProfileSchema);
