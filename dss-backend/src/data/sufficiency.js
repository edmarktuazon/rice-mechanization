// Final Machine Recommendation and Sufficiency Data (from SUFFICIENCY.docx)
const sufficiencyData = [
  {
    barangay: "COLO",
    finalHP: 6.573,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Four Wheel Tractor (51); 1 Combine Harvester (60); 1 Transplanter (25); 5 Pump and Engine Set (8)",
    riceArea: 22.4566,
    initialHP: 4.2014,
    existingMachines: "1 Combine Harvester (60); 1 Four Wheel Tractor (51)",
  },
  {
    barangay: "DAANG BAGO",
    finalHP: 3.127,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Hand Tractor (7); 1 FWT (51); 1 CH (70); 26 Pump and Engine Set (8); 2 Transplanter (25); 1 FWT (45); 1 FWT (50)",
    riceArea: 127.4282,
    initialHP: 0.904,
    existingMachines:
      "1 Hand Tractor (7); 1 Four Wheel Tractor (51); 1 Combine Harvester (70); 1 Pump and Engine Set (8)",
  },
  {
    barangay: "DALAO",
    finalHP: 3.279,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Hand Tractor (7); 2 FWT (50); 1 Walk-Behind Transplanter (4.3); 2 CH (70); 32 Pump and Engine Set (8); 2 Transplanter (25); 1 FWT (45)",
    riceArea: 152.2328,
    initialHP: 0.7752,
    existingMachines:
      "1 Hand Tractor (7); 1 FWT (50); 1 Walk-behind Transplanter (4.3); 1 CH (70); 1 Pump and Engine Set (8)",
  },
  {
    barangay: "KATAASAN",
    finalHP: 3.455,
    status: "SUFFICIENT",
    machineRecommendation:
      "2 FWT (50); 2 Hand Tractor (7); 17 Pump and Engine Set (8); 2 Transplanter (25); 1 Thresher (7); 1 FWT (45)",
    riceArea: 84.539,
    initialHP: 0.9463,
    existingMachines:
      "2 Hand Tractor (7); 1 Four Wheel Tractor (50); 4 Pump and Engine Set (8)",
  },
  {
    barangay: "LAYAC",
    finalHP: 4.769,
    status: "SUFFICIENT",
    machineRecommendation:
      "2 Pump and Engine Set (8); 1 Transplanter (25); 1 Hand Tractor (8); 1 Thresher (7)",
    riceArea: 9.7397,
    initialHP: 0,
    existingMachines: "No existing machine",
  },
  {
    barangay: "LUACAN",
    finalHP: 3.067,
    status: "SUFFICIENT",
    machineRecommendation:
      "2 Hand Tractor (7); 1 FWT (53); 3 CH (70); 1 FWT (40); 75 Pump and Engine Set (8); 4 FWT (50); 4 Transplanter (25); 3 FWT (45)",
    riceArea: 364.9157,
    initialHP: 0.7737,
    existingMachines:
      "1 FWT (53); 1 FWT (40); 1 FWT (50); 1 CH (70); 1 CH (60); 2 Hand Tractor (7); 5 Pump and Engine Set (8)",
  },
  {
    barangay: "MALIGAYA",
    finalHP: 3.643,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Four Wheel Tractor (41); 11 Pump and Engine Set (8); 2 Transplanter (25); 1 Thresher (7); 1 Four Wheel Tractor (45)",
    riceArea: 52.5951,
    initialHP: 0.7843,
    existingMachines: "1 Four Wheel Tractor (41); 1 Pump and Engine Set (8)",
  },
  {
    barangay: "NAPARING",
    finalHP: 11.818,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Walk-Behind Transplanter (4.3); 1 Hand Tractor (8); 1 Pump and Engine Set (8); 1 Thresher (7)",
    riceArea: 1.9,
    initialHP: 0,
    existingMachines: "No existing machine",
  },
  {
    barangay: "NEW SAN JOSE",
    finalHP: 3.248,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 FWT (51); 1 Hand Tractor (7); 1 CH (70); 2 Transplanter (25); 25 Pump and Engine Set (8); 1 FWT (45); 1 FWT (50)",
    riceArea: 120.7165,
    initialHP: 0.9013,
    existingMachines:
      "1 Hand Tractor (7); 1 Four Wheel Tractor (51); 1 Combine Harvester (70)",
  },
  {
    barangay: "OLD SAN JOSE",
    finalHP: 3.256,
    status: "SUFFICIENT",
    machineRecommendation:
      "2 Hand Tractor (8); 1 Hand Tractor (7); 2 FWT (50); 1 CH (70); 20 Pump and Engine Set (8); 1 Transplanter (25)",
    riceArea: 96.2235,
    initialHP: 1.7714,
    existingMachines:
      "2 Hand Tractor (8); 1 Hand Tractor (7); 2 FWT (50); 1 CH (70); 1 Pump and Engine Set (8)",
  },
  {
    barangay: "PAG-ASA",
    finalHP: 3.611,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Four Wheel Tractor (51); 1 Combine Harvester (70); 1 Transplanter (25); 11 Pump and Engine Set (8)",
    riceArea: 53.8651,
    initialHP: 1.9094,
    existingMachines: "1 Four Wheel Tractor (51); 1 Combine Harvester (70)",
  },
  {
    barangay: "PAGALANGGANG",
    finalHP: 3.081,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 FWT (55); 1 Hand Tractor (8); 38 Pump and Engine Set (8); 1 CH (60); 1 Transplanter (20); 3 Transplanter (25); 1 FWT (45); 1 FWT (50); 1 CH (70)",
    riceArea: 184.612,
    initialHP: 0.7277,
    existingMachines:
      "1 Hand Tractor (8); 1 FWT (55); 1 Transplanter (20); 1 CH (60); 2 Pump and Engine Set (8)",
  },
  {
    barangay: "PAYUMO",
    finalHP: 7.188,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Four Wheel Tractor (53); 3 Combine Harvester (70); 1 Four Wheel Tractor (55); 1 Transplanter (25); 10 Pump and Engine Set (8)",
    riceArea: 49.4651,
    initialHP: 5.4645,
    existingMachines:
      "1 Four Wheel Tractor (53); 1 Four Wheel Tractor (55); 3 Combine Harvester (70)",
  },
  {
    barangay: "PENTOR",
    finalHP: 3.016,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Four Wheel Tractor (50); 1 Combine Harvester (70); 2 Transplanter (25); 18 Pump and Engine Set (8)",
    riceArea: 86.1124,
    initialHP: 1.1845,
    existingMachines: "1 Four Wheel Tractor (50); 1 Combine Harvester (70)",
  },
  {
    barangay: "PINULOT",
    finalHP: 4.971,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Transplanter (25); 1 Four Wheel Tractor (51); 5 Pump and Engine Set (8); 1 Thresher (7)",
    riceArea: 20.56,
    initialHP: 0,
    existingMachines: "No existing machine",
  },
  {
    barangay: "PITA",
    finalHP: 3.008,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Hand Tractor (7); 4 Pump and Engine Set (7); 13 Pump and Engine Set (8); 2 Transplanter (25); 1 Thresher (7); 1 FWT (45); 1 FWT (50)",
    riceArea: 79.9201,
    initialHP: 0.3547,
    existingMachines: "1 Hand Tractor (7); 4 Pump and Engine Set (7)",
  },
  {
    barangay: "SAGUING",
    finalHP: 3.032,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Four Wheel Tractor (52); 18 Pump and Engine Set (8); 1 Hand Tractor (7); 1 Combine Harvester (70); 2 Transplanter (25)",
    riceArea: 88.1905,
    initialHP: 1.3885,
    existingMachines:
      "1 Hand Tractor (7); 1 Four Wheel Tractor (52); 1 Combine Harvester (70); 2 Pump and Engine Set (8)",
  },
  {
    barangay: "SAN BENITO",
    finalHP: 3.166,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Hand Tractor (7); 3 Transplanter (25); 20 Pump and Engine Set (8); 2 Thresher (7); 1 FWT (45); 1 FWT (50)",
    riceArea: 91.4979,
    initialHP: 0.065,
    existingMachines: "1 Hand Tractor (7)",
  },
  {
    barangay: "SAN RAMON",
    finalHP: 4.199,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Four Wheel Tractor (40); 1 Combine Harvester (70); 8 Pump and Engine Set (8); 1 Transplanter (25)",
    riceArea: 93.0474,
    initialHP: 1.165,
    existingMachines:
      "1 Four Wheel Tractor (50); 1 Combine Harvester (70); 1 Pump and Engine Set (8)",
  },
  {
    barangay: "SAN SIMON",
    finalHP: 3.182,
    status: "SUFFICIENT",
    machineRecommendation:
      "2 Transplanter (25); 2 FWT (45); 1 FWT (70); 1 CH (70); 31 Pump and Engine Set (8); 1 FWT (50)",
    riceArea: 150.4906,
    initialHP: 1.2286,
    existingMachines:
      "1 FWT (45); 1 FWT (70); 1 Transplanter (25); 1 CH (70); 1 Pump and Engine Set (8)",
  },
  {
    barangay: "SAPANG BALAS",
    finalHP: 3.177,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Four Wheel Tractor (50); 1 Combine Harvester (60); 1 Combine Harvester (70); 2 Transplanter (25); 21 Pump and Engine Set (8)",
    riceArea: 103.8279,
    initialHP: 1.4736,
    existingMachines:
      "1 Four Wheel Tractor (50); 1 Combine Harvester (60); 1 Combine Harvester (70)",
  },
  {
    barangay: "STA. ISABEL",
    finalHP: 3.914,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Hand Tractor (7); 3 Pump and Engine Set (7); 1 Pump and Engine Set (8); 2 Transplanter (25); 1 Thresher (7)",
    riceArea: 19.7376,
    initialHP: 1.1526,
    existingMachines: "1 Hand Tractor (7); 3 Pump and Engine Set (7)",
  },
  {
    barangay: "STO NINO",
    finalHP: 3.373,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Four Wheel Tractor (40); 2 Transplanter (25); 8 Pump and Engine Set (8); 1 Thresher (7)",
    riceArea: 39.5235,
    initialHP: 0.8602,
    existingMachines: "1 Four Wheel Tractor (40)",
  },
  {
    barangay: "TUBO-TUBO",
    finalHP: 3.753,
    status: "SUFFICIENT",
    machineRecommendation:
      "1 Hand Tractor (7); 5 Pump and Engine Set (8); 2 Transplanter (25); 1 Thresher (7)",
    riceArea: 22.9279,
    initialHP: 1.3761,
    existingMachines: "1 Hand Tractor (7); 4 Pump and Engine Set (8)",
  },
  {
    barangay: "TUCOP",
    finalHP: 3.084,
    status: "SUFFICIENT",
    machineRecommendation:
      "3 FWT (50); 3 Hand Tractor (7); 56 Pump and Engine Set (8); 3 Transplanter (25); 3 CH (70); 2 FWT (45)",
    riceArea: 266.6936,
    initialHP: 0.2503,
    existingMachines:
      "3 Hand Tractor (7); 1 Four Wheel Tractor (50); 1 Pump and Engine Set (8)",
  },
];

module.exports = { sufficiencyData };
