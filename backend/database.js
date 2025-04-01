require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10, // Số kết nối tối đa
    queueLimit: 0
});

// Kiểm tra kết nối
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Lỗi kết nối MySQL:", err);
    } else {
        console.log("✅ Kết nối MySQL thành công!");
        connection.release(); // Giải phóng kết nối
    }
});

module.exports = pool;
