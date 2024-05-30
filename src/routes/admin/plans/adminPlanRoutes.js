var express = require("express");
var router = express.Router();
const { ERROR, SUCCESS } = require("../../../constants/jsonMessages");
const { createPlan, getAllPlans } = require("./adminPlanService");

//***** Admin Plan Routes /v1/admin/plans *****/

router.post("/", async (req, res) => {
  const response = await createPlan(req.body);
  res.status(response.status).json(response);
});

router.get("/", async (req, res) => {
  const response = await getAllPlans(req.body);
  res.status(response.status).json(response);
});

module.exports = router;
