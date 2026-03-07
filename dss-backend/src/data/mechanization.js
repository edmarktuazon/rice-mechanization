// Mechanization Level Data per Barangay (from MECHANIZATION-LEVEL.xlsx)
const mechanizationData = [
  {
    barangay: "COLO",
    effectiveHP: 94.35,
    riceArea: 22.4566,
    mechanizationLevel: 4.2014,
    existingMachines: "1 Combine Harvester (60); 1 Four Wheel Tractor (51)",
  },
  {
    barangay: "DAANG BAGO",
    effectiveHP: 115.2,
    riceArea: 127.4282,
    mechanizationLevel: 0.904,
    existingMachines:
      "1 Hand Tractor (7); 1 Four Wheel Tractor (51); 1 Combine Harvester (70); 1 Pump and Engine Set (8)",
  },
  {
    barangay: "DALAO",
    effectiveHP: 118.005,
    riceArea: 152.2328,
    mechanizationLevel: 0.7752,
    existingMachines:
      "1 Hand Tractor (7); 1 Four Wheel Tractor (50); 1 Walk-behind Transplanter (4.3); 1 Combine Harvester (70); 1 Pump and Engine Set (8)",
  },
  {
    barangay: "KATAASAN",
    effectiveHP: 80,
    riceArea: 84.539,
    mechanizationLevel: 0.9463,
    existingMachines:
      "2 Hand Tractor (7); 1 Four Wheel Tractor (50); 4 Pump and Engine Set (8)",
  },
  {
    barangay: "LAYAC",
    effectiveHP: 0,
    riceArea: 9.7397,
    mechanizationLevel: 0,
    existingMachines: "No existing machine",
  },
  {
    barangay: "LUACAN",
    effectiveHP: 282.35,
    riceArea: 364.9157,
    mechanizationLevel: 0.7737,
    existingMachines:
      "1 FWT (53); 1 FWT (40); 1 FWT (50); 1 CH (70); 1 CH (60); 2 Hand Tractor (7); 5 Pump and Engine Set (8)",
  },
  {
    barangay: "MALIGAYA",
    effectiveHP: 41.25,
    riceArea: 52.5951,
    mechanizationLevel: 0.7843,
    existingMachines: "1 Four Wheel Tractor (41); 1 Pump and Engine Set (8)",
  },
  {
    barangay: "NAPARING",
    effectiveHP: 0,
    riceArea: 1.9,
    mechanizationLevel: 0,
    existingMachines: "No existing machine",
  },
  {
    barangay: "NEW SAN JOSE",
    effectiveHP: 108.8,
    riceArea: 120.7165,
    mechanizationLevel: 0.9013,
    existingMachines:
      "1 Hand Tractor (7); 1 Four Wheel Tractor (51); 1 Combine Harvester (70)",
  },
  {
    barangay: "OLD SAN JOSE",
    effectiveHP: 170.45,
    riceArea: 96.2235,
    mechanizationLevel: 1.7714,
    existingMachines:
      "2 Hand Tractor (8); 1 Hand Tractor (7); 2 Four Wheel Tractor (50); 1 Combine Harvester (70); 1 Pump and Engine Set (8)",
  },
  {
    barangay: "PAG-ASA",
    effectiveHP: 102.85,
    riceArea: 53.8651,
    mechanizationLevel: 1.9094,
    existingMachines: "1 Four Wheel Tractor (51); 1 Combine Harvester (70)",
  },
  {
    barangay: "PAGALANGGANG",
    effectiveHP: 134.35,
    riceArea: 184.612,
    mechanizationLevel: 0.7277,
    existingMachines:
      "1 Hand Tractor (8); 1 FWT (55); 1 Transplanter (20); 1 Combine Harvester (60); 2 Pump and Engine Set (8)",
  },
  {
    barangay: "PAYUMO",
    effectiveHP: 270.3,
    riceArea: 49.4651,
    mechanizationLevel: 5.4645,
    existingMachines:
      "1 Four Wheel Tractor (53); 1 Four Wheel Tractor (55); 3 Combine Harvester (70)",
  },
  {
    barangay: "PENTOR",
    effectiveHP: 102,
    riceArea: 86.1124,
    mechanizationLevel: 1.1845,
    existingMachines: "1 Four Wheel Tractor (50); 1 Combine Harvester (70)",
  },
  {
    barangay: "PINULOT",
    effectiveHP: 0,
    riceArea: 20.56,
    mechanizationLevel: 0,
    existingMachines: "No existing machine",
  },
  {
    barangay: "PITA",
    effectiveHP: 28.35,
    riceArea: 79.9201,
    mechanizationLevel: 0.3547,
    existingMachines: "1 Hand Tractor (7); 4 Pump and Engine Set (7)",
  },
  {
    barangay: "SAGUING",
    effectiveHP: 122.45,
    riceArea: 88.1905,
    mechanizationLevel: 1.3885,
    existingMachines:
      "1 Hand Tractor (7); 1 Four Wheel Tractor (52); 1 Combine Harvester (70); 2 Pump and Engine Set (8)",
  },
  {
    barangay: "SAN BENITO",
    effectiveHP: 5.95,
    riceArea: 91.4979,
    mechanizationLevel: 0.065,
    existingMachines: "1 Hand Tractor (7)",
  },
  {
    barangay: "SAN RAMON",
    effectiveHP: 108.4,
    riceArea: 93.0474,
    mechanizationLevel: 1.165,
    existingMachines:
      "1 Four Wheel Tractor (50); 1 Combine Harvester (70); 1 Pump and Engine Set (8)",
  },
  {
    barangay: "SAN SIMON",
    effectiveHP: 184.9,
    riceArea: 150.4906,
    mechanizationLevel: 1.2286,
    existingMachines:
      "1 FWT (45); 1 FWT (70); 1 Transplanter (25); 1 Combine Harvester (70); 1 Pump and Engine Set (8)",
  },
  {
    barangay: "SAPANG BALAS",
    effectiveHP: 153,
    riceArea: 103.8279,
    mechanizationLevel: 1.4736,
    existingMachines:
      "1 Four Wheel Tractor (50); 1 Combine Harvester (60); 1 Combine Harvester (70)",
  },
  {
    barangay: "STA. ISABEL",
    effectiveHP: 22.75,
    riceArea: 19.7376,
    mechanizationLevel: 1.1526,
    existingMachines: "1 Hand Tractor (7); 3 Pump and Engine Set (7)",
  },
  {
    barangay: "STO NINO",
    effectiveHP: 34,
    riceArea: 39.5235,
    mechanizationLevel: 0.8602,
    existingMachines: "1 Four Wheel Tractor (40)",
  },
  {
    barangay: "TUBO-TUBO",
    effectiveHP: 31.55,
    riceArea: 22.9279,
    mechanizationLevel: 1.3761,
    existingMachines: "1 Hand Tractor (7); 4 Pump and Engine Set (8)",
  },
  {
    barangay: "TUCOP",
    effectiveHP: 66.75,
    riceArea: 266.6936,
    mechanizationLevel: 0.2503,
    existingMachines:
      "3 Hand Tractor (7); 1 Four Wheel Tractor (50); 1 Pump and Engine Set (8)",
  },
];

// Classify mechanization level
const getMechanizationClass = (level) => {
  if (level === 0) return { class: "NO DATA", color: "#FFFFFF" };
  if (level < 0.9) return { class: "LOW", color: "#FDEBD0" };
  if (level < 3.0) return { class: "MODERATE", color: "#F39C12" };
  return { class: "HIGH", color: "#E74C3C" };
};

module.exports = { mechanizationData, getMechanizationClass };
