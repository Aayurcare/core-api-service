var express = require("express");
var router = express.Router();
const { ERROR, SUCCESS } = require("../../../constants/jsonMessages");
const {
  getAllWellnessPlans,
  savePlanEnquiry,
} = require("./planService");

//***** Plans Routes *****/

router.post("/enquiry", async function (req, res) {
  const response = await savePlanEnquiry(req.body);
  res.status(response.status).json(response);
});

router.get("/", async function (req, res) {
  const response = await getAllWellnessPlans();
  res.status(response.status).json(response);
});

module.exports = router;
