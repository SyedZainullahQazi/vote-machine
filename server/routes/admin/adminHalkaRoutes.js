const express = require('express');
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const CreateHalkaCont=require("../../controllers/admin/halkaController/createHalkaController")
const  getHalkaData=require("../../controllers/admin/halkaController/getHalkaController");
const deleteHalka=require("../../controllers/admin/halkaController/deleteHalkaController");
const updateHalka=require("../../controllers/admin/halkaController/updateHalkaController");

const router = express.Router();

router.post("/create-halka",authMiddleware,CreateHalkaCont);
router.get("/get-halka-data",authMiddleware,getHalkaData);
router.delete("/delete-halka",authMiddleware,deleteHalka);
router.put("/update-halka",authMiddleware,updateHalka);

module.exports = router;



