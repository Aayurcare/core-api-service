var express = require("express");
var router = express.Router();
const { getAllEnquiries, getEnquiry } = require("./adminEnquiriesService");

//***** Admin Enquiries Routes /v1/admin/plans/enquiries *****/

router.get("/", async (req, res) => {
  const response = await getAllEnquiries(req.body);
  res.status(response.status).json(response);
});

router.get("/:enquiryId", async (req, res) => {
  console.log(req.params.enquiryId);
  const response = await getEnquiry(req.params.enquiryId);
  res.status(response.status).json(response);
});

module.exports = router;
