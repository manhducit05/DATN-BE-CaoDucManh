const express = require('express');
const router = express.Router();
const controller = require("../controller/Param.controller");

router.get('/nextParams', controller.getNextParameterSet);

module.exports = router;
