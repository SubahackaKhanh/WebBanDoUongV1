const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");

// Lấy danh sách sản phẩm trong giỏ hàng của một user
router.get("/cart/:user_id", cartController.getCartItems);

// Thêm sản phẩm vào giỏ hàng
router.post("/cart", cartController.addToCart);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put("/cart/:id", cartController.updateCartItem);

// Xóa sản phẩm khỏi giỏ hàng
router.delete("/cart/:id", cartController.deleteCartItem);

module.exports = router;