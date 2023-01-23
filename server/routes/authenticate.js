const express = require('express');
const router = express.Router();

//Handlers
const {signUpHandler,loginHandler} = require('../controllers/authHandler');

router.route('/register').post(signUpHandler);
router.route('/login').post(loginHandler);


module.exports = router;