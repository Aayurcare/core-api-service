var express = require("express");
var router = express.Router();
const { ERROR, SUCCESS } = require("../../constants/jsonMessages");
const { getAccountProfile } = require("../customer/account/customerAccountService");
const { registerCustomer, loginCustomer } = require("./authService");

//***** Account Routes *****/

router.post("/admin/login", async function (req, res, next) {
  var user = req.user;
  const response = await loginCustomer(user);
  res.status(response.status).json(response);
});


router.post("/user/login", async function (req, res, next) {
  var customer = req.body;
  const response = await loginCustomer(customer);
  res.status(response.status).json(response);
});


router.post("/user/register",async (req,res,next)=>{
    var customer = req.body;
    const response = await registerCustomer(customer);
    return res.status(response.status).json(response);
});


module.exports = router;
