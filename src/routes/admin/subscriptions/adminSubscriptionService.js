const { default: mongoose } = require("mongoose");
const { createJsonResponse } = require("../../../helpers/responseGenerator");
const Plan = require("../../../models/Plan");
const Subscription = require("../../../models/Subscription");
const Customer = require("../../../models/Customer");

module.exports.issueSubscription = async (subscriptionReqBody, adminUser) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(subscriptionReqBody.planId)) {
      return createJsonResponse(400, "Invalid plan ID.");
    }

    if (!mongoose.Types.ObjectId.isValid(subscriptionReqBody.customerId)) {
      return createJsonResponse(400, "Invalid customer ID.");
    }

    const fetchedPlan = await Plan.findOne({ _id: subscriptionReqBody.planId });
    if (!fetchedPlan) {
      return createJsonResponse(404, "Plan not found.");
    }

    const fetchedCustomer = await Customer.findOne({
      _id: subscriptionReqBody.customerId,
    });
    if (!fetchedCustomer) {
      return createJsonResponse(404, "Customer not found.");
    }

    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + fetchedPlan.days.split(" ")[0]);

    const subscription = {
      planId: subscriptionReqBody.planId,
      planName: fetchedPlan.planName,
      days: fetchedPlan.days,
      category: fetchedPlan.category,
      expiryDate: expiryDate,
      purchasedFor: subscriptionReqBody.purchasedFor,
      issuedBy: adminUser._id,
      price: fetchedPlan.price,
      paymentId: "",
      customerId: subscriptionReqBody.customerId,
    };

    const createdSusbcription = await Subscription.create(subscription);
    return createJsonResponse(200, createdSusbcription);
  } catch (error) {
    console.log(error);
    return createJsonResponse(500, "Server error occured, try again.");
  }
};

module.exports.getCustomerSubscriptions = async () => {};
