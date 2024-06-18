const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const member = new mongoose.Schema({
  name: String,
  dob: String,
  gender: String,
});

const subscription = new Schema({
  planId: String,
  planName: String,
  days: String,
  description: String,
  category: String,
  price: Number,
  expiryDate: Date,
  customerId: String,
  purchasedFor: [member],
  issuedBy: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscription", subscription);
