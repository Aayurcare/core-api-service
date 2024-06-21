const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants/keys");
const Customer = require("../models/Customer");
const Admin = require("../models/Admin");

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        JWT_SECRET,
        async function (err, decode) {
          if (err) {
            console.log("err");
            req.user = undefined;
            return res.status(401).send({ message: "Unauthorized" });
          }

          const admin = await Admin.findOne({ _id: decode.id });
          if (!admin) {
            return res.status(404).send({ message: "User not found" });
          }
          console.log(`Admin ${admin.firstName} is now making the request`);
          const adminObj = admin.toObject();
          delete adminObj["password"];
          req.user = admin;
          next();
        }
      );
    } else {
      req.user = undefined;
      next();
    }
  } catch (error) {
    console.error("Unauthorized.");
  }
};

// Middleware to verify customer token
const verifyCustomerToken = (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        JWT_SECRET,
        async function (err, decode) {
          if (err) {
            console.log("err");
            req.user = undefined;
            return res.status(401).send({ message: "Unauthorized" });
          }

          const customer = await Customer.findOne({ _id: decode.id });

          if (!customer) {
            return res.status(404).send({ message: "User not found" });
          }
          const customerObj = customer.toObject();
          delete customerObj["password"];
          req.user = customerObj;

          next();
        }
      );
    } else {
      req.user = undefined;
      next();
    }
  } catch (error) {
    console.error("Unauthorized.");
  }
};

module.exports = {
  verifyAdminToken,
  verifyCustomerToken,
};
