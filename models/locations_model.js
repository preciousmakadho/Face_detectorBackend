const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LocationSchema = new Schema({

  size: Number,                 
  name: String,   
  longitude: Number,         
  latitude: Number,   
  province:String,        
  shading: Number,       
  sunlightIntensity: Number, 
  terrain: Number,
  province:Number, 
},
  { timestamps: true });

  //export the model
module.exports = mongoose.model("locations", LocationSchema);
