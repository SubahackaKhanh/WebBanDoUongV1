const express = require("express");
const router = express.Router();
const db = require("../database"); // Kết nối MySQL
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

// API đăng nhập admin
router.post("/login", async (req, res) => {  // ✅ Không dùng "/admin/login"
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    const sql = "SELECT * FROM admins WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });

      if (results.length === 0) {
        return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
      }

      const admin = results[0];
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
      }

      // Generate JWT token for admin
      const token = jwt.sign(
        { 
          id: admin.id, 
          username: admin.username,
          isAdmin: true 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(200).json({ 
        message: "Đăng nhập thành công!", 
        admin: {
          id: admin.id,
          username: admin.username
        },
        token 
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Protected admin route example
router.get("/profile", verifyToken, (req, res) => {
  // Check if the user is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Không có quyền truy cập!" });
  }
  res.json({ admin: req.user });
});

module.exports = router;
