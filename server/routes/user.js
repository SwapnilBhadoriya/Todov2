const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/jsonAuth');

const {getAllTodos,getSingleTodo,updateTodo,deleteTodo,addNewTodo} = require('../controllers/userHandler');


router.use('/:id',verifyToken);

router.route('/:id/todos').get(getAllTodos).post(addNewTodo);
router.route('/:id/todos/:task_id').get(getSingleTodo).patch(updateTodo).delete(deleteTodo);

module.exports = router;