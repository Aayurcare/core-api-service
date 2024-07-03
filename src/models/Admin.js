const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Admins can also be an employee, or a super admin
 * based on the role that it has been assigned to.
 */

const adminSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  contactNumber: Number,
  password: String,
  dob: String,
  role: String,
  lastLogin: Date,
  gender: String,
  createdBy: String,
  isActive: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
