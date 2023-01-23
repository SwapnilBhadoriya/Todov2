const { pool } = require("../config/dbconfig");

const getAllTodos = async (req, res) => {
  try {
    const result = await pool.query("Select * from Todos where user_id=$1 order by task_id",[req.user.id]);
    res.status(200).json({ success:true,data: result.rows });
  } catch (error) {
    console.log("Error in fetching data from the database..",error);
    res.status(500).json({ msg: "Server side Error", error });
  }
};
const addNewTodo = async (req, res) => {
  try {
    const addQuery = "Insert into Todos(task,user_id) Values($1,$2)";
    const todo = [req.body.task,req.user.id];
    await pool.query(addQuery, todo);
    res.status(201).json({ success:true,msg: "Successfully added the todo" });
  } catch (error) {
    res.status(500).json({ msg: "Server side Error", error });
  }
};
const getSingleTodo = async (req, res) => {
  try {
    const result = await pool.query("Select * from Todos where user_id=$1 and task_id=$2", [req.user.id,
      req.params.task_id,
    ]);
    res.status(200).json({ success:true,data: result.rows });
  } catch (error) {
    console.log("Error in getting data from the database.");
    res.status(500).json({ msg: "Server side Error", error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    await pool.query("Delete from Todos where task_id=$1 and user_id=$2", [req.params.task_id,req.user.id]);
    res.status(204).send();
  } catch (error) {
    console.log("Error in deleting data from the database.");
    res.status(500).json({ msg: "Server side Error", error });
  }
};

const updateTodo = async (req, res) => {
  try {
    const updates = [req.body.task, req.body.completed, req.params.task_id,req.user.id];
    await pool.query(
      "Update Todos set task=$1,completed=$2 where task_id=$3 and user_id=$4",
      updates
    );
    res.status(201).json({ msg: "Updation Successfull" });
  } catch (error) {
    console.log("Error in updating data to the database.");
    res.status(500).json({ msg: "Server side Error", error });
  }
};


module.exports = {getAllTodos,getSingleTodo,deleteTodo,updateTodo,addNewTodo};