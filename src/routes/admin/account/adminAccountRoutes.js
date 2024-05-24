var express = require("express");

var router = express.Router();
const { ERROR, SUCCESS } = require("../../../constants/jsonMessages");
const { getAccountProfile } = require("../../customer/account/customerAccountService");
const { verifyAdminToken } = require("../../../middleware/jwtFilter");

//***** Account Routes *****/

router.get("/profile", verifyAdminToken, async function (req, res, next) {
  var user = req.user;
  const response = await getAccountProfile(user);
  res.status(response.status).json(response);
});


router.post("/employees/", async function (req, res, next) {
  var user = req.user;
  const response = await getAccountProfile(user);
  res.status(response.status).json(response);
});

module.exports = router;
