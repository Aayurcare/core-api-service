const { ERROR } = require("../constants/jsonMessages")


module.exports.createJsonResponse = (statusCode,data) =>{
    if(statusCode >= 400){
        return { status : statusCode, error : data}
    }
    return {status: statusCode,data}
}