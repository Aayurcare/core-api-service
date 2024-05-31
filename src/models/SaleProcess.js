const mongoose = require("mongoose");
const PlanEnquiry = require("./PlanEnquiry");
const Schema = mongoose.Schema;

const saleProcessSchema = new Schema({
  id: String,
  customerId: String,
  PlanEnquiryId: String,
  preferredLanguage: String,
  status: String,
  currentApproverLevel: String,
  comments: Array,
  age: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("saleProcess", saleProcessSchema);
