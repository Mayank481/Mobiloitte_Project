require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader == null || authHeader == undefined) {
    return res.status(401).json({
      status: 401,
      message: "UnAuthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  //* verify token

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "UnAuthorized",
      });
    }

    req.user = payload;
    next();
  });
};
