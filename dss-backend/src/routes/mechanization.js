const express = require("express");
const router = express.Router();
const {
  mechanizationData,
  getMechanizationClass,
} = require("../data/mechanization");

// Get all Mechanization Data
router.get("/", (req, res) => {
  const enriched = mechanizationData.map((d) => ({
    ...d,
    classification: getMechanizationClass(d.mechanizationLevel),
  }));
  res.json({ success: true, data: enriched });
});

// Get Stats Summary
router.get("/summary", (req, res) => {
  const low = mechanizationData.filter(
    (d) => d.mechanizationLevel > 0 && d.mechanizationLevel < 0.9,
  ).length;
  const moderate = mechanizationData.filter(
    (d) => d.mechanizationLevel >= 0.9 && d.mechanizationLevel < 3.0,
  ).length;
  const high = mechanizationData.filter(
    (d) => d.mechanizationLevel >= 3.0,
  ).length;
  const noData = mechanizationData.filter(
    (d) => d.mechanizationLevel === 0,
  ).length;
  const totalHP = mechanizationData.reduce((sum, d) => sum + d.effectiveHP, 0);
  const totalArea = mechanizationData.reduce((sum, d) => sum + d.riceArea, 0);

  res.json({
    success: true,
    data: {
      totalBarangays: mechanizationData.length,
      byClass: { low, moderate, high, noData },
      totalEffectiveHP: parseFloat(totalHP.toFixed(2)),
      totalRiceArea: parseFloat(totalArea.toFixed(4)),
      averageMechanizationLevel: parseFloat((totalHP / totalArea).toFixed(4)),
    },
  });
});

// Get Single Barangay
router.get("/:barangay", (req, res) => {
  const name = req.params.barangay.toUpperCase();
  const data = mechanizationData.find((d) => d.barangay === name);
  if (!data)
    return res
      .status(404)
      .json({ success: false, error: "Barangay not found" });
  res.json({
    success: true,
    data: {
      ...data,
      classification: getMechanizationClass(data.mechanizationLevel),
    },
  });
});

module.exports = router;
