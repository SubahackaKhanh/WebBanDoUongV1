const express = require("express");
const router = express.Router();
const db = require("../database"); // Import kết nối MySQL

// API lấy danh sách user
router.get("/", (req, res) => {
  db.query("SELECT username FROM accounts", (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn MySQL:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(results);
  });
});

//API Xóa user
router.delete("/:id", async (req, res) => {
    const userId = req.params.id;
  
    try {
      console.log(` Nhận request xóa user với ID: ${userId}`);
  
      if (isNaN(userId)) {
        console.error(" ID không hợp lệ:", userId);
        return res.status(400).json({ error: "ID không hợp lệ" });
      }
  
      // Đảm bảo sử dụng `db.promise().execute(...)`
      const [result] = await db.promise().execute("DELETE FROM accounts WHERE id = ?", [userId]);
  
      console.log(" Kết quả DELETE:", result);
  
      if (result.affectedRows === 0) {
        console.error(" Không tìm thấy user với ID:", userId);
        return res.status(404).json({ error: "Không tìm thấy tài khoản" });
      }
  
      console.log("✅ Xóa thành công user với ID:", userId);
      res.json({ message: "Xóa tài khoản thành công!" });
    } catch (error) {
      console.error(" Lỗi khi xóa tài khoản:", error);
      res.status(500).json({ error: "Lỗi server" });
    }
  });
  
module.exports = router;
