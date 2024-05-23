const jwt = require("jsonwebtoken");
// const Owner = require("../models/Owner");
const { JWT_SECRET } = require("../constants/keys");

const verifyToken = (req, res, next) => {
  // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
  //   jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET, function (err, decode) {
  //     if (err) {console.log("err"); req.user = undefined;};
  //     console.log("Filter ",decode);
  //     Owner.findOne({
  //         _id: decode.id
  //       })
  //       .exec((err, user) => {
  //         if (err) {
  //           res.status(500)
  //             .send({
  //               message: err
  //             });
  //         } else {
  //           req.user = user;
  //           next();
  //         }
  //       })
  //   });
  // } else {
  //   req.user = undefined;
  //   next();
  // }
};

module.exports = verifyToken;
