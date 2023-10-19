const { check } = require('express-validator');

const validateSignup = [
    check('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters'),
    check('cnic').matches(/^\d{13}$/).withMessage('CNIC must be exactly 13 digits'),
  ];

const validateLogin = [
  check('cnic').matches(/^\d{13}$/).withMessage('CNIC must be exactly 13 digits'),
  check('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters'),
];

module.exports={
  validateLogin,
  validateSignup,
}