var express = require("express");
var router = express.Router();
const { ERROR, SUCCESS } = require("../../../constants/jsonMessages");
const {
  getCustomerProfile,
} = require("../../customer/account/customerAccountService");
const { verifyCustomerToken } = require("../../../middleware/jwtFilter");

//***** Account Routes *****/

router.get("/profile", verifyCustomerToken, async function (req, res, next) {
  var user = req.user;
  const response = await getCustomerProfile(user);
  res.status(response.status).json(response);
});

module.exports = router;
