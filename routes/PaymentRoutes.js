const express = require('express');
const { AuthenticateUser } = require("../middleware/Authenticate");
const { Makepayment, verifyPayment } = require('../controllers/paymentController');
const pay_router = express.Router();


pay_router.route('/payment').post(AuthenticateUser, Makepayment);

pay_router.route('/verifypayment/:reference').get(AuthenticateUser, verifyPayment);



module.exports = pay_router