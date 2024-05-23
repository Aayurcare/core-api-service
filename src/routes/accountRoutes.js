var express = require("express");
const verifyToken = require("../middleware/jwtFilter");
var router = express.Router();
const { ERROR, SUCCESS } = require("../constants/jsonMessages");
const { getAccountProfile } = require("../services/accountService");

//***** Customer Routes *****/

router.get("/profile", verifyToken, async function (req, res, next) {
  var user = req.user;
  const response = await getAccountProfile(user);
  res.status(response.status).json(response);
});

module.exports = router;
