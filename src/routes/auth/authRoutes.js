var express = require("express");
var router = express.Router();
const { ERROR, SUCCESS } = require("../../constants/jsonMessages");
const {
  getAccountProfile,
} = require("../customer/account/customerAccountService");
const {
  registerCustomer,
  loginCustomer,
  loginAdmin,
  registerAdmin,
} = require("./authService");
const { verifyCustomerToken } = require("../../middleware/jwtFilter");
const { verifyOTP, requestOtp } = require("./otpService");

//***** Account Routes *****/

router.post("/admin/login", async function (req, res, next) {
  var data = req.body;
  console.log(data);
  const response = await loginAdmin(data);
  res.status(response.status).json(response);
});

router.post("/admin/register", async function (req, res, next) {
  var data = req.body;
  const response = await registerAdmin(data);
  res.status(response.status).json(response);
});

router.post("/customer/login", async function (req, res, next) {
  var customer = req.body;
  const response = await loginCustomer(customer);
  res.status(response.status).json(response);
});

router.post("/customer/register/otp/verify", async (req, res, next) => {
  var customer = req.body;
  const response = await verifyOTP(customer);
  return res.status(response.status).json(response);
});

router.post("/customer/register/otp/request", async (req, res, next) => {
  const response = await requestOtp(req.body);
  return res.status(response.status).json(response);
});

router.post("/customer/register", async (req, res, next) => {
  var customer = req.body;
  const response = await registerCustomer(customer);
  return res.status(response.status).json(response);
});

router.get("/user/session", verifyCustomerToken, async (req, res, next) => {
  res.status(200).json({ data: req.user });
});

module.exports = router;
