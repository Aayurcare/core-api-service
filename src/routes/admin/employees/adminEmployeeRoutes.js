var express = require("express");
const {
  getAllEmployees,
  createNewEmployee,
} = require("./adminEmployeeServices");
const { verifyAdminToken } = require("../../../middleware/jwtFilter");
const authorize = require("../../../middleware/authoizor");
const { SUPER_ADMIN } = require("../../../helpers/rolesManager");

var router = express.Router();

router.post(
  "/employees/",
  verifyAdminToken,
  authorize([SUPER_ADMIN]),
  async function (req, res, next) {
    var user = req.user;
    const response = await createNewEmployee(req.body, user);
    res.status(response.status).json(response);
  }
);

router.get(
  "/employees/",
  verifyAdminToken,
  authorize([SUPER_ADMIN]),
  async function (req, res, next) {
    const response = await getAllEmployees(req.body.roles);
    res.status(response.status).json(response);
  }
);

module.exports = router;
