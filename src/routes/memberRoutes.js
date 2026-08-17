// const express = require("express");
// const router = express.Router();
// const memberController = require("../controllers/memberController");

// // CRUD 路由
// router.get("/", memberController.getAllMembers);
// router.get("/:id", memberController.getMemberById);
// router.post("/", memberController.createMember);
// router.put("/:id", memberController.updateMember);
// router.delete("/:id", memberController.deleteMember);

// module.exports = router;

import express from 'express';
import { getAllMembers, getMemberById, createMember, updateMember, deleteMember } from '../controllers/memberController.js';

const router = express.Router();

// CRUD 路由
router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.post('/', createMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router;