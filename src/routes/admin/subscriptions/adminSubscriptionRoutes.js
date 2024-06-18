var express = require("express");
const {
  issueSubscription,
  getCustomerSubscriptions,
} = require("./adminSubscriptionService");
const { verifyAdminToken } = require("../../../middleware/jwtFilter");
const authorize = require("../../../middleware/authoizor");
const {
  SUPER_ADMIN,
  EMPLOYEE_LEVEL_3,
} = require("../../../helpers/rolesManager");
var router = express.Router();

//***** Admin Plan Routes /v1/admin/plans *****/

router.post(
  "/",
  verifyAdminToken,
  authorize([SUPER_ADMIN]),
  async (req, res) => {
    const response = await issueSubscription(req.body, req.user);
    res.status(response.status).json(response);
  }
);

router.get("/:id", async (req, res) => {
  const response = await getCustomerSubscriptions(req.body, req.query.id);
  res.status(response.status).json(response);
});

module.exports = router;
