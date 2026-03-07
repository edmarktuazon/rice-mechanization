# DSS Rice Mechanization — Dinalupihan, Bataan

**Basis for Rice Mechanization Selection, Allocation, and Distribution**

---

## 📁 Project Structure

```
dss-project/
├── dss-backend/          ← Node.js + Express API
│   ├── src/
│   │   ├── server.js     ← Main entry point
│   │   ├── routes/       ← API routes
│   │   │   ├── mechanization.js
│   │   │   ├── sufficiency.js
│   │   │   ├── suitability.js
│   │   │   └── geojson.js
│   │   └── data/         ← Data files (from xlsx/docx)
│   │       ├── mechanization.js
│   │       ├── sufficiency.js
│   │       └── suitability.js
│   ├── .env.example
│   └── package.json
│
└── dss-frontend/         ← Vue.js + Tailwind CSS
    ├── src/
    │   ├── App.vue
    │   ├── main.js
    │   ├── router/
    │   ├── stores/dss.js  ← Pinia state management
    │   ├── components/
    │   │   ├── map/DSSMap.vue       ← Google Maps integration
    │   │   ├── sidebar/             ← Left panel
    │   │   ├── panels/              ← Popups & modals
    │   │   ├── DSSHeader.vue
    │   │   ├── DSSLogo.vue
    │   │   ├── CompassRose.vue
    │   │   └── DonutChart.vue
    │   └── assets/main.css
    ├── .env.example
    └── package.json
```

---

## 🚀 Setup Instructions

### Step 1: Clone / Copy the project

```bash
# Backend
cd dss-backend
npm install

# Frontend
cd dss-frontend
npm install
```

### Step 2: Setup Environment Variables

**Backend** — copy `.env.example` to `.env`:
```bash
cd dss-backend
cp .env.example .env
```

Edit `.env`:
```
PORT=3000
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_MAPS_API_KEY=your_key
NODE_ENV=development
```

**Frontend** — copy `.env.example` to `.env`:
```bash
cd dss-frontend
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Step 3: Setup Supabase (Optional — app works without it)

1. Go to https://supabase.com → Create new project
2. Go to SQL Editor → Run this:

```sql
-- Mechanization data table
CREATE TABLE mechanization (
  id SERIAL PRIMARY KEY,
  barangay TEXT NOT NULL,
  effective_hp DECIMAL,
  rice_area DECIMAL,
  mechanization_level DECIMAL,
  existing_machines TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sufficiency data table
CREATE TABLE sufficiency (
  id SERIAL PRIMARY KEY,
  barangay TEXT NOT NULL,
  final_hp DECIMAL,
  status TEXT,
  machine_recommendation TEXT,
  rice_area DECIMAL,
  initial_hp DECIMAL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE mechanization ENABLE ROW LEVEL SECURITY;
ALTER TABLE sufficiency ENABLE ROW LEVEL SECURITY;

-- Allow read access
CREATE POLICY "Allow public read" ON mechanization FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON sufficiency FOR SELECT USING (true);
```

### Step 4: Setup Google Maps API Key

1. Go to https://console.cloud.google.com
2. Create a new project (e.g. `dss-mechanization`)
3. Enable: **Maps JavaScript API**, **Geocoding API**
4. Create credentials → API Key
5. Restrict to HTTP referrers: `localhost:*` and your production domain
6. Add the key to both `.env` files

### Step 5: Run the app

```bash
# Terminal 1 — Backend
cd dss-backend
npm run dev   # Runs on http://localhost:3000

# Terminal 2 — Frontend
cd dss-frontend
npm run dev   # Runs on http://localhost:5173
```

---

## 🗺️ Map Data (GeoJSON)

The app fetches barangay boundaries from **Geoportal PH**:
- URL: `https://geoserver.geoportal.gov.ph/geoserver/ows`
- Municipality code: `030405` (Dinalupihan, Bataan)

If Geoportal PH is unavailable, the app falls back to simplified polygon data.

**For better accuracy**, you can download the official GeoJSON from:
- https://www.geoportal.gov.ph → Administrative Boundaries → Barangay

Then place the file at: `dss-backend/src/data/dinalupihan_barangays.geojson`

---

## 📡 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check |
| `GET /api/mechanization` | All mechanization data |
| `GET /api/mechanization/summary` | Stats summary |
| `GET /api/mechanization/:barangay` | Single barangay |
| `GET /api/sufficiency` | All sufficiency data |
| `GET /api/sufficiency/:barangay` | Single barangay |
| `POST /api/sufficiency/compute` | Compute custom sufficiency |
| `GET /api/suitability` | Full suitability dataset |
| `GET /api/suitability/slope` | Slope classes |
| `GET /api/suitability/irrigated` | Irrigated area by barangay |
| `GET /api/suitability/rainfed` | Rainfed area by barangay |
| `GET /api/geojson/barangays` | Barangay GeoJSON boundaries |
| `GET /api/geojson/municipality` | Municipal boundary |

---

## 🧠 System Modules

### 1. Land Suitability
- Municipal & Barangay Boundaries
- Road Network & Proximity (100m / 200m)
- Water Use (Rainfed / Irrigated)
- Total Rice Area
- Suitability Maps (Irrigated & Rainfed)
- Slope Class & Suitable Slope
- Soil Texture Class & Suitable Texture
- Depth Class & Depth Suitability

### 2. Mechanization Level
- Mechanization Level (hp/ha) — Low / Moderate / High
- Horsepower Availability
- LGU Service Area

### 3. Sufficiency & Machine Recommendation
- Search barangay by name
- View existing machines & current mechanization level
- View final machine recommendations
- Sufficiency status (Sufficiency Achieved / Not Sufficient)

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vue 3, Vite, Tailwind CSS, Pinia |
| Backend | Node.js, Express.js |
| Database | Supabase (PostgreSQL) |
| Map | Google Maps JavaScript API |
| Map Data | Geoportal PH (WFS) |
| Charts | Custom SVG Donut Charts |

---

## 📊 Data Sources

- **MECHANIZATION-LEVEL.xlsx** — HP, Rice Area, Mechanization Level per barangay
- **SUFFICIENCY.docx** — Existing machines, final recommendations per barangay
- **SUITABILITY.xlsx** — Land suitability parameters (slope, soil, water, road)
- **Geoportal PH** — Administrative boundaries (GeoJSON)
