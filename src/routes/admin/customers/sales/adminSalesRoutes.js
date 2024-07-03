var express = require("express");

var router = express.Router();
const { ERROR, SUCCESS } = require("../../../constants/jsonMessages");
const {
  getAccountProfile,
} = require("../../customer/account/customerAccountService");
const { verifyAdminToken } = require("../../../middleware/jwtFilter");
const authorize = require("../../../middleware/authoizor");
const { SUPER_ADMIN } = require("../../../helpers/rolesManager");

//***** Account Routes *****/
/* 
 Endpoint : /v1/admin/customer/sales
*/

router.get(
  "/customer/sales",
  verifyAdminToken,
  async function (req, res, next) {
    var user = req.user;
    const response = await getAccountProfile(user);
    res.status(response.status).json(response);
  }
);

module.exports = router;
