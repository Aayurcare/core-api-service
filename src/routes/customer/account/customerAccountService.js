const { createJsonResponse } = require("../../../helpers/responseGenerator");

module.exports.getCustomerProfile = async (user) => {
  return createJsonResponse(200, user);
};
