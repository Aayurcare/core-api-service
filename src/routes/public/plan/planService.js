const { createJsonResponse } = require("../../../helpers/responseGenerator");
const Plan = require("../../../models/Plan");
const PlanEnquiry = require("../../../models/PlanEnquiry");

module.exports.getAllWellnessPlans = async () => {
  const plans = await Plan.find({});
  const formattedData = plans.reduce((acc, plan) => {
    const category = plan.category;
    const planDetails = {
      _id: plan._id,
      planName: plan.planName,
      price: plan.price,
      days: plan.days,
      description: plan.description,
      category: plan.category,
    };

    const categoryIndex = acc.findIndex((item) => item.title === category);
    if (categoryIndex >= 0) {
      acc[categoryIndex].plans.push(planDetails);
    } else {
      acc.push({
        title: category,
        plans: [planDetails],
      });
    }
    return acc;
  }, []);
  return createJsonResponse(200, formattedData);
};

module.exports.savePlanEnquiry = async (enquiry) => {
  const { planId, planName, category, price, days } = enquiry.planDetails;
  const planDetails = {
    planId,
    planName,
    category,
    price,
    days,
  };
  enquiry.planDetails = planDetails;
  const response = await PlanEnquiry.create(enquiry);
  return createJsonResponse(200, response);
};
