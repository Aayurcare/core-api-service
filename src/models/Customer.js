const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const customerSchema = new Schema({
  firstName : String,
  lastName : String, 
  email : String, 
  contactNumber : Number, 
  password : String, 
  dob : String,
  lastLogin : Date, 
  createdAt: {
    type: Date,
    default: Date.now,
  },

});
 

module.exports = mongoose.model("Customer", customerSchema);