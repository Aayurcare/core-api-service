const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const customerSchema = new Schema({
  id: String,
  customerId : Number,
  firstName : String,
  contactNumber : String,
  addressLine1 : String,
  pincode  : Number,
  houseNo : String,
  area : String,
  landmark : String,
  restuarantId : String,
  createdAt: {
    type: Date,
    default: Date.now,
  },

});
 

module.exports = mongoose.model("Customer", customerSchema);