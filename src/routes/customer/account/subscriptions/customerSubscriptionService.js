const { createJsonResponse } = require("../../../../helpers/responseGenerator");
const Subscription = require("../../../../models/Subscription");

module.exports.getCustomerSubscriptions = async (customer) => {
  const subscriptions = await Subscription.find({ customerId: customer._id });
  return createJsonResponse(200, subscriptions);
};
