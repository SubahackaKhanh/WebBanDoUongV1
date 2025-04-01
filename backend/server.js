const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const prductRoutes = require("./routes/product");

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// CORS configuration
app.use(cors({
  origin: '*', // Allow all origins during development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/user", authRoutes);
app.use("/admin", adminRoutes);
app.use("/admin", productRoutes);
app.use("/admin/users", userRoutes);
app.use("/api/products", prductRoutes);
app.use("/api", cartRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Lỗi:", err);
  res.status(500).json({ message: "Lỗi server!", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend chạy tại http://localhost:${PORT}`);
  console.log(`📝 CORS enabled for all origins`);
});