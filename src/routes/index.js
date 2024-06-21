const adminPlanRoutes = require("./admin/plans/adminPlanRoutes");
const adminAccountRoutes = require("./admin/account/adminAccountRoutes");
const authRoutes = require("./auth/authRoutes");
const planRoutes = require("./public/plan/plansRoutes");

const { expressjwt } = require("express-jwt");

const adminManageEnquiriesRoutes = require("./admin/enquiries/adminEnquiriesRoutes1");
const adminSubscriptionRoutes = require("./admin/subscriptions/adminSubscriptionRoutes");
const adminEmployeeRoutes = require("./admin/employees/adminEmployeeRoutes");

const { JWT_SECRET } = require("../constants/keys");

const customerAccountRoutes = require("./customer/account/customerAccountRoute");
const customerSubscriptionRoutes = require("./customer/account/subscriptions/customerSubscriptionRoutes");

module.exports.registerRoutes = (app) => {
  //*** Configure JWT Authentication ***/
  app.use(
    expressjwt({ secret: JWT_SECRET, algorithms: ["HS256"] }).unless({
      path: [
        "/",
        /^\/v1\/auth\/.*/,
        "/v1/user/login",
        "/v1/plans/enquiry",
        "/v1/plans",
      ],
    })
  );

  //*** Register Routes ***/

  //Home Reponse
  app.get("/", (req, res) => {
    var response = {
      status: "runnning",
      version: "1.0.02",
      "open-endpoints": ["/v1/auth/owners/register/", "/v1/auth/owners/login/"],
    };
    res.json(response);
  });

  //OPEN ROUTES
  app.use("/v1/auth", authRoutes);
  app.use("/v1/plans", planRoutes);

  //CUSTOMER ROUTES
  app.use("/v1/account", customerAccountRoutes);
  app.use("/v1/account/subscriptions", customerSubscriptionRoutes);

  //Admin routes
  app.use("/v1/admin", adminAccountRoutes);
  app.use("/v1/admin/plans", adminPlanRoutes);
  app.use("/v1/admin/plans/enquiries", adminManageEnquiriesRoutes);
  app.use("/v1/admin/subscriptions", adminSubscriptionRoutes);
  app.use("/v1/admin", adminEmployeeRoutes);

  console.log("Registered routes");
};
