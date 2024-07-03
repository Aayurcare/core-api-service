var express = require("express");
var router = express.Router();
const { getCustomerAccounts } = require("./adminCustomerAccountService");
const { verifyAdminToken } = require("../../../../middleware/jwtFilter");

//***** Account Routes *****/
/* 
 Endpoint : /v1/admin/customers/accounts
*/

router.get("/", verifyAdminToken, async function (req, res, next) {
  const response = await getCustomerAccounts(
    req.query.customerName,
    req.query.customerPhone
  );
  res.status(response.status).json(response);
});

module.exports = router;
