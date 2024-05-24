const { createJsonResponse } = require("../../../helpers/responseGenerator");
const { EMPLOYEE_LEVEL_1, EMPLOYEE_LEVEL_2, EMPLOYEE_LEVEL_3 } = require("../../../helpers/rolesManager");
const Admin = require("../../../models/Admin")

 

module.exports.getAllEmployees = async (filter)=>{
    try {
        const roles = filter;
        if(!roles){
            roles = [EMPLOYEE_LEVEL_1,EMPLOYEE_LEVEL_2,EMPLOYEE_LEVEL_3];
        }

        const employees = await Admin.find({ role: { $in: roles } });
        return createJsonResponse(200,employees);
        
    } catch (error) {
        
    }
}