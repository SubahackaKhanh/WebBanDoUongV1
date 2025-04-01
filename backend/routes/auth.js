const express = require("express");
const router = express.Router();
const db = require("../database"); // Kết nối MySQL
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

// API đăng nhập user
router.post("/login", async (req, res) => {  // ✅ Không dùng "/user/login"
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    const sql = "SELECT * FROM accounts WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });

      if (results.length === 0) {
        return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(200).json({ 
        message: "Đăng nhập thành công!", 
        user: {
          id: user.id,
          username: user.username
        },
        token 
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// API Đăng ký user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  try {
    const checkUserSql = "SELECT * FROM accounts WHERE username = ?";
    db.query(checkUserSql, [username], async (err, results) => {
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });

      if (results.length > 0) {
        return res.status(400).json({ message: "Tài khoản đã tồn tại!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertUserSql = "INSERT INTO accounts (username, password) VALUES (?, ?)";
      db.query(insertUserSql, [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: "Lỗi khi lưu vào database", error: err });

        res.status(201).json({ message: "Đăng ký thành công!" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Protected route example
router.get("/profile", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
