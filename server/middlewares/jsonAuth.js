const jwt = require("jsonwebtoken");
const { pool } = require("../config/dbconfig");
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
      return res
        .status(401)
        .json({ msg: "Log In Again Token Expired Invalid token" });
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

const verifyAdmin = async function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ msg: "You must be logged in to view this page.." });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const admin = await pool.query(
      "Select * from persons where email=$1 and is_admin=$2",
      [decoded.email, true]
    );

    if (admin.rowCount === 0) {
      return res.status(401).json({ msg: "Unauthorised access !!" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Server side error try logging in again ." });
  }
};

module.exports = { generateToken, verifyToken, verifyAdmin };
