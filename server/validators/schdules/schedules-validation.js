const { body } = require('express-validator');
const scheduleValidation = [
    body('startDateTime').isISO8601().toDate()
        .custom((value, { req }) => {
            if (value >= req.body.endDateTime) {
                throw new Error('Start Time must be before End Time');
            }
            return true;
        }),

    body('endDateTime').isISO8601().toDate(),

    body('startDateTime').custom((value) => {
            const currentDateTime = new Date();
            if (value < currentDateTime) {
                throw new Error('Start Time must be after current time');
            }
            return true;
        }),

    body('endDateTime').custom((value) => {
            const currentDateTime = new Date();
            if (value < currentDateTime) {
                throw new Error('End Time must be after current time');
            }
            return true;
        }),

]

module.exports={
scheduleValidation,
}