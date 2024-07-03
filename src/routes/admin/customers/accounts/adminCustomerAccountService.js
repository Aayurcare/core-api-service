const { createJsonResponse } = require("../../../../helpers/responseGenerator");
const Customer = require("../../../../models/Customer");

/**
 * Returns list of customers for the admin panel
 * Initially returns 25 customers list
 * Parameters: customerName, customerPhone
 *
 * @param {String} customerName - (Optional) Name of the customer to filter
 * @param {String} customerPhone - (Optional) Phone number of the customer to filter
 * @param {Number} limit - (Optional) Number of customers to return, default is 25
 * @param {Number} page - (Optional) Page number for pagination, default is 1
 * @returns {Promise<Array>} - List of customers
 */
module.exports.getCustomerAccounts = async (
  customerName = "",
  customerPhone = undefined,
  page = 1
) => {
  try {
    const limit = 25;
    const query = {};

    // Add filters to the query for partial and case-insensitive search
    if (customerName) {
      query.firstName = { $regex: customerName, $options: "i" }; // Partial and case-insensitive search for name
    }
    if (customerPhone) {
      query.contactNumber = { $regex: customerPhone, $options: "i" }; // Partial and case-insensitive search for phone
    }

    // Pagination options
    const options = {
      limit: parseInt(limit, 10),
      skip: (parseInt(page, 10) - 1) * parseInt(limit, 10),
    };

    // Query the database
    const customers = await Customer.find(query, null, options);
    return createJsonResponse(200, customers);
  } catch (error) {
    console.log(error);
    return createJsonResponse(500, "Unable to fetch customers.");
  }
};
