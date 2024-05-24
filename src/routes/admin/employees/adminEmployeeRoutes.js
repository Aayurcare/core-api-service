
var express = require("express");
const { getAllEmployees } = require("./adminEmployeeServices");

var router = express.Router();


router.post("/employees/",verifyAdminToken,authorize([SUPER_ADMIN]), async function (req, res, next) {
    var user = req.user;
    const response = await getAccountProfile(user);
    res.status(response.status).json(response);
});


router.get("/employees/",verifyAdminToken,authorize([SUPER_ADMIN]), async function (req, res, next) {
    const response = await getAllEmployees(req.body.roles);
    res.status(response.status).json(response);
});


  module.exports = router;
