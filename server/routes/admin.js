const express = require('express');
const router = express.Router();

const {loginHandler,getAllUsers,getAllTasks,deleteTodo} = require('../controllers/adminHandler');
const {verifyAdmin} = require('../middlewares/jsonAuth');



router.route('/').post(loginHandler);

router.use(verifyAdmin);

router.route('/users').get(getAllUsers)
router.route('/tasks').get(getAllTasks)

router.route('/tasks/:id/:task_id').delete(deleteTodo);

module.exports = router;

