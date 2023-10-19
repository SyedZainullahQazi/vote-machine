const express = require('express');
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const adminAuthMiddleware=require("../../middlewares/auth/adminAuthMiddleware");

const CreateHalkaCont=require("../../controllers/admin/halkaController/createHalkaController")
const  getHalkaData=require("../../controllers/admin/halkaController/getHalkaController");
const deleteHalka=require("../../controllers/admin/halkaController/deleteHalkaController");
const updateHalka=require("../../controllers/admin/halkaController/updateHalkaController");

const {validateCreateHalka,validateHalkaUpdate}=require("../../validators/halka/halka-validation");
const validator=require("../../middlewares/validator/validator");
const router = express.Router();

router.post("/create-halka",validateCreateHalka,validator,adminAuthMiddleware,CreateHalkaCont);
router.get("/get-halka-data",authMiddleware,getHalkaData);
router.delete("/delete-halka",adminAuthMiddleware,deleteHalka);
router.put("/update-halka",validateHalkaUpdate,validator,adminAuthMiddleware,updateHalka);

module.exports = router;



