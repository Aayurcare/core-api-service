const { createJsonResponse } = require("../../../helpers/responseGenerator");
const PlanEnquiry = require("../../../models/PlanEnquiry");

module.exports.getAllEnquiries = async () => {
  try {
    const enquiries = await PlanEnquiry.find({});
    return createJsonResponse(200, enquiries);
  } catch (error) {
    return createJsonResponse(500, "Error occured,try again");
  }
};

module.exports.getEnquiry = async (id) => {
  try {
    const enquiries = await PlanEnquiry.findOne({ _id: id });
    return createJsonResponse(200, enquiries);
  } catch (error) {
    return createJsonResponse(500, "Error occured,try again");
  }
};
