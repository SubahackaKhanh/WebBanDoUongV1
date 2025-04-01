const express = require("express");
const router = express.Router();
const db = require("../database"); // Import kết nối MySQL

// API lấy danh sách sản phẩm
router.get("/", async (req, res) => {
  try {
    const [products] = await db.promise().query("SELECT * FROM product"); // Thêm .promise()
    res.json(products);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// API lấy chi tiết sản phẩm theo ID
router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const [product] = await db.promise().query("SELECT * FROM product WHERE id = ?", [productId]);

    if (product.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }

    res.json(product[0]);
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
