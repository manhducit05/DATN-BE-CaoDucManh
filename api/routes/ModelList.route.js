const express = require('express')
const router = express.Router();
const controller = require("../controller/ModelList.controler")

router.get('/getData', controller.getProcTime);
router.put('/updateData', controller.updateProcTime);

router.get('/getAllData', controller.getAllData);
router.put('/updateNumberProcessed', controller.updateNumberProcessed);
router.put('/updateNumberFailed', controller.updateNumberFailed);
router.put('/decreaseFailedCount', controller.decreaseFailedCount);
router.put('/updateNumberProcessedTo0', controller.updateNumberProcessedTo0);
router.put('/resetNumberProcessed', controller.resetNumberProcessed);
router.put('/UpdateSimtime', controller.updateSimTimeFromQuery);
router.get('/getSimTime', controller.getSimTime);

module.exports = router;