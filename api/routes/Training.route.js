const express = require('express')
const router = express.Router();
const controller = require("../controller/Training.controller")

router.post('/training/batch', controller.trainingBatch);
router.get('/training/best', controller.getBestEfficiency);

module.exports = router;