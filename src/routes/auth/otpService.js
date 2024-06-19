const { createJsonResponse } = require("../../helpers/responseGenerator");
const OTPRequest = require("../../models/OTPRequest");

module.exports.requestOtp = async (request) => {
  try {
    //TODO Write logic for re-requesting OTP
    if (!request.contactNumber) {
      return createJsonResponse(400, "Contact number not provided.");
    }

    if (request.contactNumber.toString().length != 10) {
      return createJsonResponse(
        400,
        "Contact number invalid." + request.contactNumber.length
      );
    }
    var generatedOTP = Math.floor(1000 + Math.random() * 9000);
    request.generatedOTP = generatedOTP;
    const savedOTPRequest = await OTPRequest.create(request);
    const savedOTPObj = savedOTPRequest.toObject();
    delete savedOTPObj["generatedOTP"];
    return createJsonResponse(200, savedOTPObj);
  } catch (error) {
    console.log(error);
    return createJsonResponse(500, "Something happened, try again.");
  }
};

module.exports.verifyOTP = async (request) => {
  try {
    if (!request.requestId || !request.otp) {
      return createJsonResponse(400, "Invalid OTP/Session.");
    }

    if (request.otp.toString().length != 4) {
      return createJsonResponse(400, "Invalid OTP.");
    }

    let fetchedOTPRequest = await OTPRequest.findOneAndUpdate(
      { _id: request.requestId, generatedOTP: request.otp },
      {
        status: "verified",
      },
      {
        new: true,
      }
    );
    console.log(fetchedOTPRequest);
    if (!fetchedOTPRequest) {
      return createJsonResponse(400, "OTP not verified.");
    }

    return createJsonResponse(200, fetchedOTPRequest);
  } catch (error) {
    console.log(error);
    return createJsonResponse(500, "Something happened, try again.");
  }
};
