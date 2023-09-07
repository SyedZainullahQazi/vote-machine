const express = require('express');
const router = express.Router();

const AddSchedule=require("../../controllers/admin/scheduleElections/add-schedule");
const GetSchedule=require("../../controllers/admin/scheduleElections/get-schedule");
const DeleteSchedule=require("../../controllers/admin/scheduleElections/delete-schedule");
const UpdateSchedule=require("../../controllers/admin/scheduleElections/update-schedule");
const {scheduleValidation}=require("../../validators/schdules/schedules-validation");
const validator=require("../../middlewares/validator/validator");
const authMiddleware =require("../../middlewares/auth/authMiddleware");
const adminAuthMiddleware=require("../../middlewares/auth/adminAuthMiddleware");

router.post('/add-schedule',scheduleValidation,validator,adminAuthMiddleware,AddSchedule);
router.get('/get-schedules',authMiddleware,GetSchedule);
router.delete('/delete-schedule',adminAuthMiddleware,DeleteSchedule);
router.put('/update-schedule',scheduleValidation,validator,adminAuthMiddleware,UpdateSchedule);

module.exports = router;
