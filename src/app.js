// src/app.js
// ─────────────────────────────────────────────────────
//  Entry point – sets up Express and starts the server.
// ─────────────────────────────────────────────────────

require("dotenv").config();

const express       = require("express");
const schoolRoutes  = require("./routes/schoolRoutes");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Global Middleware ─────────────────────────────────
app.use(express.json());                          // parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // parse form bodies

// ── Health Check ──────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🏫 School Management API is running.",
    endpoints: {
      addSchool:   "POST /addSchool",
      listSchools: "GET  /listSchools?latitude=<lat>&longitude=<lon>",
    },
  });
});

// ── API Routes ────────────────────────────────────────
app.use("/", schoolRoutes);

// ── 404 Handler ───────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found.`,
  });
});

// ── Global Error Handler ──────────────────────────────
app.use((err, req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
});

// ── Start Server ──────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Server running at http://localhost:${PORT}`);
  console.log(`📋  Endpoints:`);
  console.log(`    POST http://localhost:${PORT}/addSchool`);
  console.log(`    GET  http://localhost:${PORT}/listSchools?latitude=28.61&longitude=77.20\n`);
});

module.exports = app; // exported for testing
