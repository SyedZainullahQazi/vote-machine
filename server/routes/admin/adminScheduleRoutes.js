const express = require('express');
const router = express.Router();

const AddSchedule=require("../../controllers/admin/scheduleElections/add-schedule");
const GetSchedule=require("../../controllers/admin/scheduleElections/get-schedule");
const DeleteSchedule=require("../../controllers/admin/scheduleElections/delete-schedule");
const UpdateSchedule=require("../../controllers/admin/scheduleElections/update-schedule");
const authMiddleware =require("../../middlewares/auth/authMiddleware");

router.post('/add-schedule',authMiddleware,AddSchedule);
router.get('/get-schedules',authMiddleware,GetSchedule);
router.delete('/delete-schedule',authMiddleware,DeleteSchedule);
router.put('/update-schedule',authMiddleware,UpdateSchedule);

module.exports = router;
