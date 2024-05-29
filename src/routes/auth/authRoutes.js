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

router.post("/user/login", async function (req, res, next) {
  var customer = req.body;
  const response = await loginCustomer(customer);
  res.status(response.status).json(response);
});

router.post("/user/register", async (req, res, next) => {
  var customer = req.body;
  const response = await registerCustomer(customer);
  return res.status(response.status).json(response);
});

module.exports = router;
