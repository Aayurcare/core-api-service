const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants/keys");
const Customer = require("../models/Customer");


// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
  //   jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET, function (err, decode) {
  //     if (err) {
  //       console.log("err");
  //       req.user = undefined;
  //       return res.status(401).send({ message: "Unauthorized" });
  //     };
  //     console.log("Filter ", decode);
  //     Owner.findOne({ _id: decode.id }).exec((err, user) => {
  //       if (err) {
  //         return res.status(500).send({ message: err });
  //       } else if (!user) {
  //         return res.status(404).send({ message: "User not found" });
  //       } else {
  //         req.user = user;
  //         next();
  //       }
  //     });
  //   });
  // } else {
  //   req.user = undefined;
  //   next();
  // }
};

// Middleware to verify customer token
const verifyCustomerToken = (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET, function (err, decode) {
        if (err) {
          console.log("err");
          req.user = undefined;
          return res.status(401).send({ message: "Unauthorized" });
        };
        console.log("Filter ", decode);
        Customer.findOne({ _id: decode.id }).exec((err, user) => {
          if (err) {
            return res.status(500).send({ message: err });
          } else if (!user) {
            return res.status(404).send({ message: "User not found" });
          } else {
            req.user = user;
            next();
          }
        });
      });
    } else {
      req.user = undefined;
      next();
    }
  } catch (error) {
    console.error("Unauthorized.")
  }
};

module.exports = {
  verifyAdminToken,
  verifyCustomerToken
};
