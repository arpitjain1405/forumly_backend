const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");
const auth = require('../middleware/auth.js');
const isOwnerOrAdmin = require('../middleware/isOwnerOrAdmin.js');

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.get("/:id/discussions", categoryController.getDiscussionsByCategoryId);
router.post("/", auth, isOwnerOrAdmin('Category', { adminsOnly: true }), categoryController.createCategory); //Admin only
router.put("/:id", auth, isOwnerOrAdmin('Category', { adminsOnly: true }), categoryController.updateCategory); //Admin only
router.delete("/:id", auth, isOwnerOrAdmin('Category', { adminsOnly: true }), categoryController.deleteCategory); //Admin only

module.exports = router;