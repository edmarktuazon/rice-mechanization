const express = require("express");
const router = express.Router();
const { suitabilityData } = require("../data/suitability");

// Get Full suitability dataset
router.get("/", (req, res) => {
  res.json({ success: true, data: suitabilityData });
});

// Get Summary
router.get("/summary", (req, res) => {
  res.json({ success: true, data: suitabilityData.summary });
});

// Get Slope
router.get("/slope", (req, res) => {
  res.json({ success: true, data: suitabilityData.slopeClasses });
});

// Get Solid Texture
router.get("/soil-texture", (req, res) => {
  res.json({ success: true, data: suitabilityData.soilTextureClasses });
});

// Get Depth
router.get("/depth", (req, res) => {
  res.json({ success: true, data: suitabilityData.depthClasses });
});

// Get Irrigated
router.get("/irrigated", (req, res) => {
  res.json({ success: true, data: suitabilityData.irrigatedByBarangay });
});

// Get Rainfed
router.get("/rainfed", (req, res) => {
  res.json({ success: true, data: suitabilityData.rainfedByBarangay });
});

module.exports = router;
