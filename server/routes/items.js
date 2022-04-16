const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const {
  getAllItems,
  createItem,
  deleteItem,
  updateItem,
  likeItem,
  itemDetails,
  getItemsByCategory,
  soldItem,
} = require("../controllers/items");

router.get("/", getAllItems);
router.get("/Category", getItemsByCategory);
router.post("/", auth, createItem);
router.delete("/Delete/:id", auth, deleteItem);
router.put("/Update/:id", auth, updateItem);
router.get("/:itemId", itemDetails);
router.patch("/Like/:id", auth, likeItem);
router.patch("/sold/:id", auth, soldItem);
module.exports = router;
