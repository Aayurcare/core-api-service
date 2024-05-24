const { createJsonResponse } = require("../../../helpers/responseGenerator");

module.exports.getCustomerProfile = async (admin) => {
    return createJsonResponse(200,admin);
};
