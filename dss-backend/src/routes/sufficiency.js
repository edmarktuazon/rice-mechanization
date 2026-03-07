const express = require("express");
const router = express.Router();
const { sufficiencyData } = require("../data/sufficiency");

// Get all Sufficiency Data
router.get("/", (req, res) => {
  res.json({ success: true, data: sufficiencyData });
});

// Get Summary
router.get("/summary", (req, res) => {
  const sufficient = sufficiencyData.filter(
    (d) => d.status === "SUFFICIENT",
  ).length;
  const insufficient = sufficiencyData.filter(
    (d) => d.status === "INSUFFICIENT",
  ).length;
  const avgFinalHP =
    sufficiencyData.reduce((sum, d) => sum + d.finalHP, 0) /
    sufficiencyData.length;

  res.json({
    success: true,
    data: {
      total: sufficiencyData.length,
      sufficient,
      insufficient,
      averageFinalHP: parseFloat(avgFinalHP.toFixed(3)),
    },
  });
});

// Get Barangay
router.get("/:barangay", (req, res) => {
  const name = req.params.barangay.toUpperCase();
  const data = sufficiencyData.find(
    (d) =>
      d.barangay === name ||
      d.barangay.replace(/[^A-Z ]/g, "") === name.replace(/[^A-Z ]/g, ""),
  );
  if (!data)
    return res
      .status(404)
      .json({ success: false, error: "Barangay not found" });
  res.json({ success: true, data });
});

// Post Compute sufficiency for custom input
router.post("/compute", (req, res) => {
  const { barangay, riceArea, existingMachines } = req.body;
  if (!barangay || !riceArea) {
    return res
      .status(400)
      .json({ success: false, error: "barangay and riceArea are required" });
  }

  // Compute initial HP from existing machines
  let totalHP = 0;
  if (existingMachines && Array.isArray(existingMachines)) {
    totalHP = existingMachines.reduce((sum, m) => sum + (m.hp || 0), 0);
  }

  const initialHPperHa = riceArea > 0 ? totalHP / riceArea : 0;
  const isSufficient = initialHPperHa >= 3.0;

  res.json({
    success: true,
    data: {
      barangay,
      riceArea,
      totalHP,
      hpPerHa: parseFloat(initialHPperHa.toFixed(4)),
      status: isSufficient ? "SUFFICIENT" : "INSUFFICIENT",
      threshold: 3.0,
    },
  });
});

module.exports = router;
