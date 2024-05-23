var express = require("express");
const verifyToken = require("../../middleware/jwtFilter");
var router = express.Router();
const { ERROR, SUCCESS } = require("../../constants/jsonMessages");
const { createPlan } = require("../../services/admin/adminPlanService");

//***** Admin Plan Routes *****/

router.post("/", async (req, res) => {
  const response = await createPlan(req.body);
  res.status(response.status).json(response);
});

module.exports = router;
