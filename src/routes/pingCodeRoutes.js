// const express = require("express");
// const router = express.Router();
// const pingCodeController = require("../controllers/pingCodeController");

// // CRUD 路由
// router.get("/get-token", pingCodeController.getToken);

// module.exports = router;


import express from 'express';
import { getToken } from '../controllers/pingCodeController.js'; // 假设 controller 导出的是命名导出，或根据实际调整

const router = express.Router();

// CRUD 路由
router.get('/get-token', getToken);

export default router;