const express = require('express')
const router = express.Router();
const controller = require("../controller/GA.controller")

router.get('/executionGA', controller.executionGA);

module.exports = router;