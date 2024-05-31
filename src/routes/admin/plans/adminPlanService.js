const Plan = require("../../../models/Plan");
const { createJsonResponse } = require("../../../helpers/responseGenerator");

module.exports.createPlan = async (plan) => {
  // const createdPlan = await Plan.create(plan);
  //TODO Validtion of incoming data
  //Restricting plan creation
  return createJsonResponse(200, plan);
};

module.exports.getAllPlans = async () => {
  try {
    const allPlans = await Plan.find({});
    return createJsonResponse(200, allPlans);
  } catch (error) {
    return createJsonResponse(400, "Some error occured, try again.");
  }
};

module.exports.updatePlan = async (id, data) => {
  try {
    // Find the plan by ID and update it
    const updatedPlan = await Plan.findByIdAndUpdate(id, data, { new: true });
    if (!updatedPlan) {
      return createJsonResponse(404, "Plan not found.");
    }
    return createJsonResponse(200, updatedPlan);
  } catch (error) {
    console.error("Error updating plan:", error);
    return createJsonResponse(
      500,
      "An error occurred while updating the plan."
    );
  }
};
