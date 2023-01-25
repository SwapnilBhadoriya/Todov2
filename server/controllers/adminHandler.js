const { pool } = require("../config/dbconfig");
const { generateToken } = require("../middlewares/jsonAuth");

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
    if (userData.is_admin === false) {
      return res
        .status(401)
        .json({ msg: "You don't have access to admin panel ." });
    }
    if (userData.password === password) {
      const payload = { email, name: userData.user_name, id: userData.user_id };
      const token = await generateToken(payload);
      return res
        .status(201)
        .json({ token, msg: "Login Successfull", id: userData.user_id });
    }
    return res.status(401).send({ msg: "Invalid credentials in password" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Error while logging the user.", error });
  }
};

const getAllUsers = async function (req, res) {
  try {
    const data = await pool.query("Select * from persons");
    return res.status(200).json({ success: true, users: data.rows });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error in getting users from the server" });
  }
};

const getAllTasks = async function (req, res) {
  try {
    const data = await pool.query(
      "Select * from todos join persons on todos.user_id=persons.user_id"
    );
    return res.status(200).json({ success: true, tasks: data.rows });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Server side error : Error in fetching tasks", error });
  }
};

const deleteTodo = async function (req, res) {
  try {
    await pool.query("Delete from Todos where task_id=$1 and user_id=$2", [
      req.params.task_id,
      req.params.id,
    ]);
    res.status(204).send();
  } catch (error) {
    console.log("Error in deleting data from the database.");
    res.status(500).json({ msg: "Server side Error", error });
  }
};

module.exports = { loginHandler, getAllUsers, getAllTasks,deleteTodo };
