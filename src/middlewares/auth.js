// auth.js
const jwt = require("jwt-simple");
const moment = require("moment");
const secret = process.env.JWT_SECRET;

module.exports.auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ status: "error", message: "No token provided." });
  }

  try {
    let token = req.headers.authorization.replace(/['"]+/g, '');

    if (!token.startsWith('Bearer ')) {
      return res.status(403).send({ status: "error", message: "Invalid token format. Use 'Bearer <token>'" });
    }

    token = token.split(" ")[1];

    const decoded = jwt.decode(token, secret);

    if (decoded.exp <= moment().unix()) {
      return res.status(401).send({ status: "error", message: "Token has expired" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ 
      status: "error", 
      message: "Invalid token", 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
};
