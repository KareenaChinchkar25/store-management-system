const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

exports.signToken = payload =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

exports.verifyToken = token =>
  jwt.verify(token, JWT_SECRET);
