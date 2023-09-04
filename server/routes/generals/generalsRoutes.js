const express = require('express');
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const GetUserDetails= require("../../controllers/general/GetUserDetails");

const router = express.Router();

router.post('/user-details',authMiddleware,GetUserDetails);

module.exports = router;



