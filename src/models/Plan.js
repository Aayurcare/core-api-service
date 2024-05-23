const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
  id: String,
  planName: String,
  days: String,
  description: String,
  category: String,
  price: Number,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Plan", planSchema);
