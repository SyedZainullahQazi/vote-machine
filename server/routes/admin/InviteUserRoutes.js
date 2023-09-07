const express = require('express');
const adminAuthMiddleware = require("../../middlewares/auth/adminAuthMiddleware");

const InviteUserCont=require("../../controllers/admin/inviteUser/InviteUserController");

const router = express.Router();

router.put("/Invite",adminAuthMiddleware,InviteUserCont.InviteUser);

module.exports = router;



