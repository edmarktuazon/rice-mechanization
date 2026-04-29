require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const mechanizationRoutes = require("./routes/mechanization");
const suitabilityRoutes = require("./routes/suitability");
const sufficiencyRoutes = require("./routes/sufficiency");
const geojsonRoutes = require("./routes/geojson");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "DSS Rice Mechanization API is running",
    timestamp: new Date(),
  });
});

// Routes
app.use("/api/mechanization", mechanizationRoutes);
app.use("/api/suitability", suitabilityRoutes);
app.use("/api/sufficiency", sufficiencyRoutes);
app.use("/api/geojson", geojsonRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Internal server error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`DSS Backend running on http://localhost:${PORT}`);
});

module.exports = app;
