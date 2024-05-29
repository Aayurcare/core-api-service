const bcrypt = require("bcryptjs");
const { createJsonResponse } = require("../../helpers/responseGenerator");
const jwt = require("jsonwebtoken");
const { ERROR, SUCCESS } = require("../../constants/jsonMessages");
const Customer = require("../../models/Customer");
const { JWT_SECRET } = require("../../constants/keys");
const Admin = require("../../models/Admin");

module.exports.registerCustomer = async (customer) => {
  try {
    const { contactNumber, email, password } = customer;
    if (!contactNumber || !email || !password) {
      return {
        status: 400,
        error: "No contact,email or password sent.",
      };
    }
    const existingCustomer = await Customer.findOne({ contactNumber, email });

    if (existingCustomer) {
      return {
        status: 409,
        error: "Mobile number already registered, try logging in.",
      };
    }
    var encryptedPassword = await bcrypt.hash(password, 10);
    customer.password = encryptedPassword;

    const savedCustomer = Customer.create(customer);
    const customerObject = savedCustomer.toObject();
    delete customerObject.password;
    return createJsonResponse(200, customerObject);
  } catch (error) {
    return createJsonResponse(400, "Unable to save data, try again.");
  }
};

module.exports.loginCustomer = async (customer) => {
  try {
    const { contactNumber, password } = customer;
    const fetchedCustomer = await Customer.findOne({ contactNumber });

    //customer is not found in database
    if (!fetchedCustomer) {
      return {
        status: 404,
        error: "Customer not found.",
      };
    }
    console.log(fetchedCustomer);
    console.log(password);
    //Check if passwords are equals
    if (await bcrypt.compare(password, fetchedCustomer.password)) {
      console.log("Logging in", fetchedCustomer._id);
      const token = generateJwtToken(fetchedCustomer._id);
      return {
        status: 200,
        token: token,
      };
    }

    //Passwords are not matching so providing invalid response
    return {
      status: 400,
      error: "Invalid password.",
    };
  } catch (error) {
    console.error(error);
    return createJsonResponse(400, "Some error occured.");
  }
};

module.exports.loginAdmin = async (admin) => {
  try {
    const { email, password } = admin;
    const fetchedAdmin = await Admin.findOne({ email });

    //customer is not found in database
    if (!fetchedAdmin) {
      return {
        status: 404,
        error: "Admin not found.",
      };
    }

    //Check if passwords are equals
    if (await bcrypt.compare(password, fetchedAdmin.password)) {
      console.log("Logging in", fetchedAdmin._id);
      const token = generateJwtToken(fetchedAdmin._id);
      return {
        status: 200,
        token: token,
      };
    }

    //Passwords are not matching so providing invalid response
    return {
      status: 400,
      error: "Invalid password.",
    };
  } catch (error) {
    console.error(error);
    return createJsonResponse(400, "Some error occured.");
  }
};

module.exports.registerAdmin = async (admin) => {
  try {
    const { contactNumber, email, password } = admin;
    if (!contactNumber || !email || !password) {
      return {
        status: 400,
        error: "No contact,email or password sent.",
      };
    }
    const existingAdmin = await Admin.findOne({ contactNumber, email });

    if (existingAdmin) {
      return {
        status: 409,
        error: "Mobile number already registered, try logging in.",
      };
    }
    var encryptedPassword = await bcrypt.hash(password, 10);
    admin.password = encryptedPassword;

    const savedCustomer = Admin.create(admin);
    const adminObject = savedCustomer.toObject();
    delete adminObject.password;
    return createJsonResponse(200, adminObject);
  } catch (error) {
    return createJsonResponse(400, "Unable to save data, try again.");
  }
};

function generateJwtToken(id) {
  const payload = {
    id: id,
  };
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "10d",
  });
}
