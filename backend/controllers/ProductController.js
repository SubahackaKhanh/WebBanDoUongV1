const db = require("../database"); // Đường dẫn đã đúng

// Lấy danh sách sản phẩm
// Lấy danh sách sản phẩm, có thể lọc theo loại (type)
exports.getProducts = (req, res) => {
    const { type } = req.query; // Lấy tham số type từ query string

    let sql = "SELECT * FROM product";
    let params = [];

    if (type) {
        sql += " WHERE type = ?";
        params.push(type);
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error("Lỗi lấy danh sách sản phẩm:", err.stack);
            return res.status(500).json({ error: "Lỗi server" });
        }
        res.json(results);
    });
};


// Cập nhật sản phẩm theo ID
exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, type } = req.body;

    if (!name || !price || !type) {
        return res.status(400).json({ error: "Thiếu dữ liệu cập nhật!" });
    }

    const sql = "UPDATE product SET name = ?, price = ?, type = ? WHERE id = ?";
    db.query(sql, [name, price, type, id], (err, result) => {
        if (err) {
            console.error("Lỗi cập nhật sản phẩm:", err.stack);
            return res.status(500).json({ error: "Lỗi server" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy sản phẩm!" });
        }
        res.json({ message: "Cập nhật sản phẩm thành công!" });
    });
};

// Xóa sản phẩm theo ID
exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM product WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Lỗi xóa sản phẩm:", err.stack);
            return res.status(500).json({ error: "Lỗi server" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy sản phẩm!" });
        }
        res.json({ message: "Xóa sản phẩm thành công!" });
    });
};