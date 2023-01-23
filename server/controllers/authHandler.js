const { pool } = require("../config/dbconfig");
const { generateToken, verifyToken } = require("../middlewares/jsonAuth");

const signUpHandler = async function (req, res) {
  try {
    const { user_name, email, password } = req.body;
    const findUser = await pool.query(
      "SELECT * FROM persons WHERE email = $1",
      [email]
    );
    if (findUser.rowCount > 0) {
      return res
        .status(401)
        .json({ msg: "User with this email already exists." });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = password;
    const result = await pool.query(
      "INSERT INTO persons (user_name, email, password) VALUES ($1, $2, $3) returning user_id",
      [user_name, email, hashedPassword]
    );
    const id = result.rows[0].user_id;
    const payload = { email, name: user_name, id };
    const token = await generateToken(payload);
    return res.status(201).json({ token, msg: "Sign Up successfull", id });
  } catch (error) {
    console.error("Error in Signing Up", error);
    return res
      .status(500)
      .json({ msg: "Error while signing up the new user.", error });
  }
};

const loginHandler = async function (req, res) {
  try {
    const { email, password } = req.body;
    const findEmail = await pool.query("Select * from persons where email=$1", [
      email,
    ]);

    if (findEmail.rowCount === 0) {
      return res.status(401).json({ msg: "Invalid credentials in email." });
    }
    const userData = findEmail.rows[0];
    if (userData.password === password) {
      const payload = { email, name: userData.user_name, id: userData.user_id };
      const token = await generateToken(payload);
      return res
        .status(201)
        .json({ token, msg: "Login Successfull", id: userData.user_id });
    }
    return res.status(401).send({ msg: "Invalid credentials in password" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error while logging the user.", error });
  }
};

module.exports = { signUpHandler, loginHandler };
