const { check } = require('express-validator');

const validateCreateHalka = [
    check('halka.halkaName').isLength({ min: 3 }).withMessage('New password must be at least 3 characters long'),
];
const validateHalkaUpdate = [
    check('halkaId').matches(/^\d{4}$/).withMessage('HALKA ID must be exactly 4 digits'),
    check('halkaName').isLength({ min: 3 }).withMessage('Halka Name must be at least 3 characters long'),
  ];

module.exports={
    validateCreateHalka,
    validateHalkaUpdate
}