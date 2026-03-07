-- ============================================================
-- DSS Rice Mechanization — Supabase Database Setup
-- Dinalupihan, Bataan
--
-- HOW TO USE:
--   1. Go to https://supabase.com → Your Project
--   2. Click "SQL Editor" in the left sidebar
--   3. Paste this entire file and click "Run"
-- ============================================================

-- ── 1. MECHANIZATION TABLE ───────────────────────────────────
CREATE TABLE IF NOT EXISTS mechanization (
  id                  SERIAL PRIMARY KEY,
  barangay            TEXT NOT NULL UNIQUE,
  effective_hp        DECIMAL(10,4),
  rice_area           DECIMAL(10,4),
  mechanization_level DECIMAL(10,7),
  existing_machines   TEXT,
  created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── 2. SUFFICIENCY TABLE ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS sufficiency (
  id                     SERIAL PRIMARY KEY,
  barangay               TEXT NOT NULL UNIQUE,
  final_hp               DECIMAL(10,3),
  status                 TEXT CHECK (status IN ('SUFFICIENT','INSUFFICIENT')),
  machine_recommendation TEXT,
  rice_area              DECIMAL(10,4),
  initial_hp             DECIMAL(10,7),
  existing_machines      TEXT,
  created_at             TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── 3. ROW LEVEL SECURITY ────────────────────────────────────
ALTER TABLE mechanization ENABLE ROW LEVEL SECURITY;
ALTER TABLE sufficiency   ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (public data)
CREATE POLICY "Public read mechanization"
  ON mechanization FOR SELECT USING (true);

CREATE POLICY "Public read sufficiency"
  ON sufficiency FOR SELECT USING (true);

-- ── 4. SEED MECHANIZATION DATA ───────────────────────────────
INSERT INTO mechanization (barangay, effective_hp, rice_area, mechanization_level, existing_machines) VALUES
  ('COLO',         94.35,  22.4566,  4.2014, '1 Combine Harvester (60); 1 Four Wheel Tractor (51)'),
  ('DAANG BAGO',  115.20, 127.4282,  0.9040, '1 Hand Tractor (7); 1 FWT (51); 1 CH (70); 1 Pump and Engine Set (8)'),
  ('DALAO',       118.005,152.2328,  0.7752, '1 Hand Tractor (7); 1 FWT (50); 1 Walk-behind Transplanter (4.3); 1 CH (70); 1 Pump and Engine Set (8)'),
  ('KATAASAN',     80.00,  84.5390,  0.9463, '2 Hand Tractor (7); 1 FWT (50); 4 Pump and Engine Set (8)'),
  ('LAYAC',         0.00,   9.7397,  0.0000, 'No existing machine'),
  ('LUACAN',      282.35, 364.9157,  0.7737, '1 FWT (53); 1 FWT (40); 1 FWT (50); 1 CH (70); 1 CH (60); 2 Hand Tractor (7); 5 Pump and Engine Set (8)'),
  ('MALIGAYA',     41.25,  52.5951,  0.7843, '1 Four Wheel Tractor (41); 1 Pump and Engine Set (8)'),
  ('NAPARING',      0.00,   1.9000,  0.0000, 'No existing machine'),
  ('NEW SAN JOSE',108.80, 120.7165,  0.9013, '1 Hand Tractor (7); 1 FWT (51); 1 CH (70)'),
  ('OLD SAN JOSE',170.45,  96.2235,  1.7714, '2 Hand Tractor (8); 1 Hand Tractor (7); 2 FWT (50); 1 CH (70); 1 Pump and Engine Set (8)'),
  ('PAG-ASA',     102.85,  53.8651,  1.9094, '1 Four Wheel Tractor (51); 1 Combine Harvester (70)'),
  ('PAGALANGGANG',134.35, 184.6120,  0.7277, '1 Hand Tractor (8); 1 FWT (55); 1 Transplanter (20); 1 CH (60); 2 Pump and Engine Set (8)'),
  ('PAYUMO',      270.30,  49.4651,  5.4645, '1 FWT (53); 1 FWT (55); 3 Combine Harvester (70)'),
  ('PENTOR',      102.00,  86.1124,  1.1845, '1 Four Wheel Tractor (50); 1 Combine Harvester (70)'),
  ('PINULOT',       0.00,  20.5600,  0.0000, 'No existing machine'),
  ('PITA',         28.35,  79.9201,  0.3547, '1 Hand Tractor (7); 4 Pump and Engine Set (7)'),
  ('SAGUING',     122.45,  88.1905,  1.3885, '1 Hand Tractor (7); 1 FWT (52); 1 CH (70); 2 Pump and Engine Set (8)'),
  ('SAN BENITO',    5.95,  91.4979,  0.0650, '1 Hand Tractor (7)'),
  ('SAN RAMON',   108.40,  93.0474,  1.1650, '1 FWT (50); 1 CH (70); 1 Pump and Engine Set (8)'),
  ('SAN SIMON',   184.90, 150.4906,  1.2286, '1 FWT (45); 1 FWT (70); 1 Transplanter (25); 1 CH (70); 1 Pump and Engine Set (8)'),
  ('SAPANG BALAS',153.00, 103.8279,  1.4736, '1 FWT (50); 1 CH (60); 1 CH (70)'),
  ('STA. ISABEL',  22.75,  19.7376,  1.1526, '1 Hand Tractor (7); 3 Pump and Engine Set (7)'),
  ('STO NINO',     34.00,  39.5235,  0.8602, '1 Four Wheel Tractor (40)'),
  ('TUBO-TUBO',    31.55,  22.9279,  1.3761, '1 Hand Tractor (7); 4 Pump and Engine Set (8)'),
  ('TUCOP',        66.75, 266.6936,  0.2503, '3 Hand Tractor (7); 1 FWT (50); 1 Pump and Engine Set (8)')
ON CONFLICT (barangay) DO NOTHING;

-- ── 5. SEED SUFFICIENCY DATA ─────────────────────────────────
INSERT INTO sufficiency (barangay, final_hp, status, machine_recommendation, rice_area, initial_hp, existing_machines) VALUES
  ('COLO',         6.573, 'SUFFICIENT', '1 FWT (51); 1 CH (60); 1 Transplanter (25); 5 Pump and Engine Set (8)', 22.4566, 4.2014, '1 CH (60); 1 FWT (51)'),
  ('DAANG BAGO',   3.127, 'SUFFICIENT', '1 Hand Tractor (7); 1 FWT (51); 1 CH (70); 26 Pump and Engine Set (8); 2 Transplanter (25); 1 FWT (45); 1 FWT (50)', 127.4282, 0.9040, '1 Hand Tractor (7); 1 FWT (51); 1 CH (70); 1 Pump and Engine Set (8)'),
  ('DALAO',        3.279, 'SUFFICIENT', '1 Hand Tractor (7); 2 FWT (50); 1 Walk-Behind Transplanter (4.3); 2 CH (70); 32 Pump and Engine Set (8); 2 Transplanter (25); 1 FWT (45)', 152.2328, 0.7752, '1 Hand Tractor (7); 1 FWT (50); 1 Walk-behind Transplanter (4.3); 1 CH (70); 1 Pump and Engine Set (8)'),
  ('KATAASAN',     3.455, 'SUFFICIENT', '2 FWT (50); 2 Hand Tractor (7); 17 Pump and Engine Set (8); 2 Transplanter (25); 1 Thresher (7); 1 FWT (45)', 84.539, 0.9463, '2 Hand Tractor (7); 1 FWT (50); 4 Pump and Engine Set (8)'),
  ('LAYAC',        4.769, 'SUFFICIENT', '2 Pump and Engine Set (8); 1 Transplanter (25); 1 Hand Tractor (8); 1 Thresher (7)', 9.7397, 0.0000, 'No existing machine'),
  ('LUACAN',       3.067, 'SUFFICIENT', '2 Hand Tractor (7); 1 FWT (53); 3 CH (70); 1 FWT (40); 75 Pump and Engine Set (8); 4 FWT (50); 4 Transplanter (25); 3 FWT (45)', 364.9157, 0.7737, '1 FWT (53); 1 FWT (40); 1 FWT (50); 1 CH (70); 1 CH (60); 2 Hand Tractor (7); 5 Pump and Engine Set (8)'),
  ('MALIGAYA',     3.643, 'SUFFICIENT', '1 FWT (41); 11 Pump and Engine Set (8); 2 Transplanter (25); 1 Thresher (7); 1 FWT (45)', 52.5951, 0.7843, '1 FWT (41); 1 Pump and Engine Set (8)'),
  ('NAPARING',    11.818, 'SUFFICIENT', '1 Walk-Behind Transplanter (4.3); 1 Hand Tractor (8); 1 Pump and Engine Set (8); 1 Thresher (7)', 1.9000, 0.0000, 'No existing machine'),
  ('NEW SAN JOSE', 3.248, 'SUFFICIENT', '1 FWT (51); 1 Hand Tractor (7); 1 CH (70); 2 Transplanter (25); 25 Pump and Engine Set (8); 1 FWT (45); 1 FWT (50)', 120.7165, 0.9013, '1 Hand Tractor (7); 1 FWT (51); 1 CH (70)'),
  ('OLD SAN JOSE', 3.256, 'SUFFICIENT', '2 Hand Tractor (8); 1 Hand Tractor (7); 2 FWT (50); 1 CH (70); 20 Pump and Engine Set (8); 1 Transplanter (25)', 96.2235, 1.7714, '2 Hand Tractor (8); 1 Hand Tractor (7); 2 FWT (50); 1 CH (70); 1 Pump and Engine Set (8)'),
  ('PAG-ASA',      3.611, 'SUFFICIENT', '1 FWT (51); 1 CH (70); 1 Transplanter (25); 11 Pump and Engine Set (8)', 53.8651, 1.9094, '1 FWT (51); 1 CH (70)'),
  ('PAGALANGGANG', 3.081, 'SUFFICIENT', '1 FWT (55); 1 Hand Tractor (8); 38 Pump and Engine Set (8); 1 CH (60); 1 Transplanter (20); 3 Transplanter (25); 1 FWT (45); 1 FWT (50); 1 CH (70)', 184.6120, 0.7277, '1 Hand Tractor (8); 1 FWT (55); 1 Transplanter (20); 1 CH (60); 2 Pump and Engine Set (8)'),
  ('PAYUMO',       7.188, 'SUFFICIENT', '1 FWT (53); 3 CH (70); 1 FWT (55); 1 Transplanter (25); 10 Pump and Engine Set (8)', 49.4651, 5.4645, '1 FWT (53); 1 FWT (55); 3 CH (70)'),
  ('PENTOR',       3.016, 'SUFFICIENT', '1 FWT (50); 1 CH (70); 2 Transplanter (25); 18 Pump and Engine Set (8)', 86.1124, 1.1845, '1 FWT (50); 1 CH (70)'),
  ('PINULOT',      4.971, 'SUFFICIENT', '1 Transplanter (25); 1 FWT (51); 5 Pump and Engine Set (8); 1 Thresher (7)', 20.5600, 0.0000, 'No existing machine'),
  ('PITA',         3.008, 'SUFFICIENT', '1 Hand Tractor (7); 4 Pump and Engine Set (7); 13 Pump and Engine Set (8); 2 Transplanter (25); 1 Thresher (7); 1 FWT (45); 1 FWT (50)', 79.9201, 0.3547, '1 Hand Tractor (7); 4 Pump and Engine Set (7)'),
  ('SAGUING',      3.032, 'SUFFICIENT', '1 FWT (52); 18 Pump and Engine Set (8); 1 Hand Tractor (7); 1 CH (70); 2 Transplanter (25)', 88.1905, 1.3885, '1 Hand Tractor (7); 1 FWT (52); 1 CH (70); 2 Pump and Engine Set (8)'),
  ('SAN BENITO',   3.166, 'SUFFICIENT', '1 Hand Tractor (7); 3 Transplanter (25); 20 Pump and Engine Set (8); 2 Thresher (7); 1 FWT (45); 1 FWT (50)', 91.4979, 0.0650, '1 Hand Tractor (7)'),
  ('SAN RAMON',    4.199, 'SUFFICIENT', '1 FWT (40); 1 CH (70); 8 Pump and Engine Set (8); 1 Transplanter (25)', 93.0474, 1.1650, '1 FWT (50); 1 CH (70); 1 Pump and Engine Set (8)'),
  ('SAN SIMON',    3.182, 'SUFFICIENT', '2 Transplanter (25); 2 FWT (45); 1 FWT (70); 1 CH (70); 31 Pump and Engine Set (8); 1 FWT (50)', 150.4906, 1.2286, '1 FWT (45); 1 FWT (70); 1 Transplanter (25); 1 CH (70); 1 Pump and Engine Set (8)'),
  ('SAPANG BALAS', 3.177, 'SUFFICIENT', '1 FWT (50); 1 CH (60); 1 CH (70); 2 Transplanter (25); 21 Pump and Engine Set (8)', 103.8279, 1.4736, '1 FWT (50); 1 CH (60); 1 CH (70)'),
  ('STA. ISABEL',  3.914, 'SUFFICIENT', '1 Hand Tractor (7); 3 Pump and Engine Set (7); 1 Pump and Engine Set (8); 2 Transplanter (25); 1 Thresher (7)', 19.7376, 1.1526, '1 Hand Tractor (7); 3 Pump and Engine Set (7)'),
  ('STO NINO',     3.373, 'SUFFICIENT', '1 FWT (40); 2 Transplanter (25); 8 Pump and Engine Set (8); 1 Thresher (7)', 39.5235, 0.8602, '1 FWT (40)'),
  ('TUBO-TUBO',    3.753, 'SUFFICIENT', '1 Hand Tractor (7); 5 Pump and Engine Set (8); 2 Transplanter (25); 1 Thresher (7)', 22.9279, 1.3761, '1 Hand Tractor (7); 4 Pump and Engine Set (8)'),
  ('TUCOP',        3.084, 'SUFFICIENT', '3 FWT (50); 3 Hand Tractor (7); 56 Pump and Engine Set (8); 3 Transplanter (25); 3 CH (70); 2 FWT (45)', 266.6936, 0.2503, '3 Hand Tractor (7); 1 FWT (50); 1 Pump and Engine Set (8)')
ON CONFLICT (barangay) DO NOTHING;

-- ── 6. VERIFY ────────────────────────────────────────────────
SELECT 'mechanization' AS table_name, COUNT(*) AS rows FROM mechanization
UNION ALL
SELECT 'sufficiency', COUNT(*) FROM sufficiency;

-- Expected output:
--  table_name    | rows
--  mechanization | 25
--  sufficiency   | 25
