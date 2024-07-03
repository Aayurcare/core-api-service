const mongoose = require("mongoose");
const PlanEnquiry = require("./PlanEnquiry");
const Schema = mongoose.Schema;

const documentDetail = new mongoose.Schema({
  name: String,
  documentUrl: String,
});

const comment = new mongoose.Schema({
  content: String,
  authorAdminId: String,
  authorAdminName: String,
});

const saleProcessSchema = new Schema({
  id: String,
  customerId: String,
  planEnquiryId: String,
  preferredLanguage: String,
  status: String,
  currentApproverLevel: String,
  age: Number,
  comments: [comment],
  documents: [documentDetail],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("saleProcess", saleProcessSchema);
