const { createJsonResponse } = require("../../../helpers/responseGenerator");
const {
  EMPLOYEE_LEVEL_1,
  EMPLOYEE_LEVEL_2,
  EMPLOYEE_LEVEL_3,
} = require("../../../helpers/rolesManager");
const Admin = require("../../../models/Admin");

module.exports.getAllEmployees = async (filter) => {
  try {
    let roles = filter;
    //If no roles provided, get employees from all the roles
    if (!roles) {
      roles = [EMPLOYEE_LEVEL_1, EMPLOYEE_LEVEL_2, EMPLOYEE_LEVEL_3];
    }
    const employees = await Admin.find({ role: { $in: roles } }).lean();

    employees.forEach((emp) => {
      delete emp["password"];
    });
    return createJsonResponse(200, employees);
  } catch (error) {
    console.log(error);
    return createJsonResponse(500, "Something happened. ");
  }
};

module.exports.createNewEmployee = async (employeeData, admin) => {
  try {
    const { firstName, email, contactNumber, password } = employeeData;

    if (!firstName || !email || !contactNumber || !password) {
      return createJsonResponse(
        400,
        "firstName, email, contactNumber, password are mandatory fields"
      );
    }

    const existingEmployee = await Admin.findOne({ contactNumber });
    if (existingEmployee) {
      return createJsonResponse(409, "Employee already exists.");
    }

    employeeData.createdBy = admin._id;
    employeeData.role = EMPLOYEE_LEVEL_1;
    const savedEmployee = await Admin.create(employeeData);
    const empObj = savedEmployee.toObject();
    delete empObj["password"];

    return createJsonResponse(200, empObj);
  } catch (error) {
    console.log(error);
    return createJsonResponse(500, "Something happened. ");
  }
};
