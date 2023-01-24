const express = require('express');
const router = express.Router();

const {loginHandler} = require('../controllers/adminHandler');


router.route('/').post(loginHandler);



module.exports = router;

