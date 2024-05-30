const Plan = require("../../../models/Plan");
const { createJsonResponse } = require("../../../helpers/responseGenerator");

module.exports.createPlan = async (plan) => {
  console.log(plan);

  const createdPlan = await Plan.create(plan);
  return createJsonResponse(200, createdPlan);
};

module.exports.getAllPlans = async () => {
  try {
    const allPlans = await Plan.find({});
    return createJsonResponse(200, allPlans);
  } catch (error) {
    return createJsonResponse(400, "Some error occured, try again.");
  }
};
