const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planEnquirySchema = new Schema({
  id: String,
  name: String,
  email: String,
  mobileNumber: Number,
  preferredLanguage: String,
  status: String,
  comments: Array,
  age: Number,
  planDetails: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PlanEnquiry", planEnquirySchema);
