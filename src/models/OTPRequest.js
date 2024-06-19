const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpRequest = new Schema({
  contactNumber: Number,
  source: String,
  generatedOTP: Number,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("OTPRequest", otpRequest);
