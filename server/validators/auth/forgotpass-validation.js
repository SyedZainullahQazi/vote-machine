const { check } = require('express-validator');

const validateResetPassword = [
    check('cnic').matches(/^\d{13}$/).withMessage('CNIC must be exactly 13 digits'),
  ];

const validateNewPasswordReset = [
    check('OTP').isLength({ min: 12 }).withMessage('OTP must be 12 characters long'),
    check('password').isLength({ min: 3 }).withMessage('New password must be at least 3 characters long'),
];

module.exports={validateResetPassword,validateNewPasswordReset}