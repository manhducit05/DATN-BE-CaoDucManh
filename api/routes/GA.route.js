const express = require('express');
const router = express.Router();
const controller = require("../controller/GA.controller");

// Đảm bảo đúng hàm, không phải object thường
router.get('/runGA', controller.runGA);

module.exports = router; 
