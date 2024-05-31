const Plan = require("../../models/Plan");
const { createJsonResponse } = require("../../helpers/responseGenerator");

module.exports.createPlan = async (plan) => {
  const createdPlan = await Plan.create(plan);
  return createJsonResponse(200, createdPlan);
};
