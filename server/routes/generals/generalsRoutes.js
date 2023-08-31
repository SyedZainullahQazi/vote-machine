const express = require('express');
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {GetUserDetails,GetUserDetailsForInvite}= require("../../controllers/general/GetUserDetails");


const router = express.Router();

router.post('/user-details',authMiddleware,GetUserDetails);
router.get('/user-details/for-invite',authMiddleware,GetUserDetailsForInvite);

module.exports = router;



