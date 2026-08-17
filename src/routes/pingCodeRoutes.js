const express = require("express");
const router = express.Router();
const pingCodeController = require("../controllers/pingCodeController");

// CRUD 路由
router.get("/get-token", pingCodeController.getToken);

module.exports = router;
