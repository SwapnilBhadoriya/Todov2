const jwt = require("jsonwebtoken");
const secretKey = "thisisaSecret";

const generateToken = async function (payload) {
  const token = await jwt.sign(payload, secretKey);
  return token;
};

const verifyToken = async function (req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res
      .status(401)
      .json({ msg: "You must be logged in to view this page.." });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Log In Again Token Expired Invalid token" });
    }
    const id = Number(req.params.id);
    // console.log(req.params);
    // console.log(decoded);
    if (id !== decoded.id) {
      return res.status(401).json({ msg: "Unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};
module.exports = {generateToken,verifyToken};
