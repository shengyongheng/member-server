const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");

// CRUD 路由
router.get("/", memberController.getAllMembers);
router.get("/:id", memberController.getMemberById);
router.post("/", memberController.createMember);
router.put("/:id", memberController.updateMember);
router.delete("/:id", memberController.deleteMember);

module.exports = router;
