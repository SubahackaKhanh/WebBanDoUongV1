// controllers/CartController.js
const db = require("../database");

// Lấy danh sách sản phẩm trong giỏ hàng của một user
exports.getCartItems = (req, res) => {
  const { user_id } = req.params;

  db.query(
    `SELECT c.id, c.product_id, c.quantity, c.created_at, 
            p.name, p.price, p.image, p.type 
     FROM cart c 
     JOIN product p ON c.product_id = p.id 
     WHERE c.user_id = ?`,
    [user_id],
    (error, rows) => {
      if (error) {
        console.error("Lỗi lấy danh sách giỏ hàng:", error.stack);
        return res.status(500).json({ error: "Lỗi server", details: error.message });
      }
      res.json(rows);
    }
  );
};

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  console.log("Request body:", { user_id, product_id, quantity });

  if (!user_id || !product_id) {
    return res.status(400).json({ error: "Thiếu user_id hoặc product_id!" });
  }

  db.query(
    "SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?",
    [user_id, product_id],
    (error, existing) => {
      if (error) {
        console.error("Lỗi kiểm tra giỏ hàng:", error.stack);
        return res.status(500).json({ error: "Lỗi server", details: error.message });
      }

      console.log("Existing cart items:", existing);

      if (existing && existing.length > 0) {
        const newQuantity = existing[0].quantity + (quantity || 1);
        db.query(
          "UPDATE cart SET quantity = ? WHERE id = ?",
          [newQuantity, existing[0].id],
          (updateError) => {
            if (updateError) {
              console.error("Lỗi cập nhật giỏ hàng:", updateError.stack);
              return res.status(500).json({ error: "Lỗi server", details: updateError.message });
            }
            res.json({ message: "Đã cập nhật số lượng sản phẩm trong giỏ!" });
          }
        );
      } else {
        db.query(
          "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
          [user_id, product_id, quantity || 1],
          (insertError, result) => {
            if (insertError) {
              console.error("Lỗi thêm sản phẩm vào giỏ:", insertError.stack);
              if (insertError.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: "Sản phẩm không tồn tại trong danh sách!" });
              }
              return res.status(500).json({ error: "Lỗi server", details: insertError.message });
            }
            res.status(201).json({ message: "Đã thêm sản phẩm vào giỏ!", cartId: result.insertId });
          }
        );
      }
    }
  );
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
exports.updateCartItem = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: "Số lượng phải lớn hơn 0!" });
  }

  db.query(
    "UPDATE cart SET quantity = ? WHERE id = ?",
    [quantity, id],
    (error, result) => {
      if (error) {
        console.error("Lỗi cập nhật giỏ hàng:", error.stack);
        return res.status(500).json({ error: "Lỗi server", details: error.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Không tìm thấy mục trong giỏ!" });
      }

      res.json({ message: "Cập nhật số lượng thành công!" });
    }
  );
};

// Xóa sản phẩm khỏi giỏ hàng
exports.deleteCartItem = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM cart WHERE id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("Lỗi xóa sản phẩm khỏi giỏ:", error.stack);
        return res.status(500).json({ error: "Lỗi server", details: error.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Không tìm thấy mục trong giỏ!" });
      }

      res.json({ message: "Xóa sản phẩm khỏi giỏ thành công!" });
    }
  );
};