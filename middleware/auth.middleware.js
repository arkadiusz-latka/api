const jwt = require("jsonwebtoken");
const { getUserById } = require("../database/user");

const { API_SECRET } = require('../env');

const auth = async (req, res, next) => {
  const token = req.headers["authorization"] && req.headers["authorization"].split(' ')[1];
  if (!token) {
    return res.status(403).send({message: "You have to send authorization token"});
  }
  try {
    const decoded = jwt.verify(token, API_SECRET);
    const user = await getUserById(decoded.id);
    delete user.password;
    req.user = user;
  } catch (err) {
    return res.status(403).send({message: "Authorization token incorrect."});
  }
  return next();
};

module.exports = auth;