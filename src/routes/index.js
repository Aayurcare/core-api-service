const adminPlanRoutes = require("./admin/adminPlanRoutes");
const planRoutes = require("./plansRoutes");
const { expressjwt } = require("express-jwt");

const { JWT_SECRET } = require("../constants/keys");

module.exports.registerRoutes = (app) => {
  //*** Configure JWT Authentication ***/
  app.use(
    expressjwt({ secret: JWT_SECRET, algorithms: ["HS256"] }).unless({
      path: [
        "/",
        "/v1/plans/enquiry",
        "/v1/plans",
        "/v1/auth/owners/login/",
        "/v1/admin/plans",
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
  // app.use("v1/accounts/", accountRoutes);
  app.use("/v1/plans", planRoutes);

  //Admin routes
  app.use("/v1/admin/plans", adminPlanRoutes);

  console.log("Registered routes");
};
