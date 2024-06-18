var express = require("express");
var router = express.Router();

const { verifyCustomerToken } = require("../../../../middleware/jwtFilter");
const { getCustomerSubscriptions } = require("./customerSubscriptionService");

//***** Account Routes *****/

router.get("/", verifyCustomerToken, async function (req, res, next) {
  var user = req.user;
  const response = await getCustomerSubscriptions(user);
  res.status(response.status).json(response);
});

module.exports = router;
