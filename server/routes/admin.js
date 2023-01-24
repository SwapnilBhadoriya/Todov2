const express = require('express');
const router = express.Router();

const {loginHandler,getAllUsers} = require('../controllers/adminHandler');
const {verifyAdmin} = require('../middlewares/jsonAuth');


router.route('/').post(loginHandler);

router.use(verifyAdmin);

router.route('/users').get(getAllUsers)

module.exports = router;

