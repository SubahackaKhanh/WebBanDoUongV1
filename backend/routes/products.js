const express = require("express");
const router = express.Router();
const db = require("../database");
const productController = require("../controllers/ProductController"); // Import từ ProductController.js

// API lấy danh sách sản phẩm
router.get("/products", productController.getProducts);

// API thêm sản phẩm
router.post("/products", (req, res) => {
  const { name, price, image, type } = req.body;

  if (!name || !price || !type) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin: name, price, type" });
  }

  const sql = "INSERT INTO product (name, price, image, type) VALUES (?, ?, ?, ?)";
  const values = [name, price, image && image.trim() !== "" ? image : null, type];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi thêm sản phẩm", error: err });
    }
    res.status(201).json({ message: "Thêm sản phẩm thành công!", productId: result.insertId });
  });
});

// API cập nhật sản phẩm theo ID
router.put("/products/:id", productController.updateProduct);

// API xóa sản phẩm theo ID
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;