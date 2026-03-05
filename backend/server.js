const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const documentRoutes = require("./routes/documentRoutes");

// Parse JSON (base64 images)
// JSON first
app.use(express.json({ limit: "15mb" }));

// CORS (simple, no throwing)
app.use(
  cors({
    origin: true, // reflects request Origin header (works for localhost + LAN + render)
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight handler (do NOT use "*" in your setup; use regex)
app.options(/.*/, (req, res) => {
  res.sendStatus(204);
});

// health
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/documents", documentRoutes);

const PORT = process.env.PORT || 5000;

// IMPORTANT for Render: don't force host unless you need LAN access
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});