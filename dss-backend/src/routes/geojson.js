const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const MUNICIPALITY_CODE = "030405";

// Load embedded GeoJSON fallbacks
let embeddedBarangayGeoJSON = null;
let embeddedMunicipalityGeoJSON = null;

try {
  embeddedBarangayGeoJSON = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../data/dinalupihan_barangays.geojson"),
      "utf8",
    ),
  );
} catch (e) {
  console.error("Could not load embedded barangay GeoJSON:", e.message);
}

try {
  embeddedMunicipalityGeoJSON = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../data/dinalupihan_municipality.geojson"),
      "utf8",
    ),
  );
} catch (e) {
  console.error("Could not load embedded municipality GeoJSON:", e.message);
}

router.get("/barangays", async (req, res) => {
  try {
    const url = `https://geoserver.geoportal.gov.ph/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geoportal:psa_administrative_barangay&outputFormat=application/json&CQL_FILTER=mun_code='${MUNICIPALITY_CODE}'`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (response.ok) {
      const geojson = await response.json();
      if (geojson.features?.length > 5) {
        console.log(`Geoportal PH: ${geojson.features.length} barangays`);
        return res.json({ success: true, source: "geoportal", data: geojson });
      }
    }
  } catch (e) {
    console.log("Geoportal unavailable, trying OSM...");
  }

  try {
    const overpassQuery = `[out:json][timeout:20];
(
  relation["admin_level"="10"]["name"~"Dinalupihan",i];
  relation["place"="barangay"]["is_in:municipality"~"Dinalupihan",i];
);
out geom;`;
    const controller2 = new AbortController();
    const timeout2 = setTimeout(() => controller2.abort(), 12000);
    const osmRes = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: `data=${encodeURIComponent(overpassQuery)}`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: controller2.signal,
    });
    clearTimeout(timeout2);
    if (osmRes.ok) {
      const osmData = await osmRes.json();
      if (osmData.elements?.length > 5) {
        const geojson = osmToGeoJSON(osmData);
        if (geojson.features.length > 5) {
          console.log(`OSM Overpass: ${geojson.features.length} barangays`);
          return res.json({ success: true, source: "osm", data: geojson });
        }
      }
    }
  } catch (e) {
    console.log("OSM unavailable, using embedded fallback");
  }

  if (embeddedBarangayGeoJSON) {
    console.log(
      `Using embedded GeoJSON (${embeddedBarangayGeoJSON.features?.length} barangays)`,
    );
    return res.json({
      success: true,
      source: "embedded",
      data: embeddedBarangayGeoJSON,
    });
  }

  return res
    .status(500)
    .json({ success: false, message: "No GeoJSON source available" });
});

// Convert OSM Overpass result to GeoJSON
function osmToGeoJSON(osmData) {
  const features = [];
  for (const el of osmData.elements) {
    if (el.type !== "relation" || !el.members) continue;
    const name = el.tags?.name || el.tags?.["name:en"] || "Unknown";
    const outerWay = el.members.find(
      (m) => m.type === "way" && m.role === "outer",
    );
    if (!outerWay?.geometry) continue;
    const coords = outerWay.geometry.map((pt) => [pt.lon, pt.lat]);
    if (coords.length < 4) continue;
    if (coords[0][0] !== coords[coords.length - 1][0]) coords.push(coords[0]);
    features.push({
      type: "Feature",
      properties: { name: name.toUpperCase() },
      geometry: { type: "Polygon", coordinates: [coords] },
    });
  }
  return { type: "FeatureCollection", features };
}

router.get("/municipality", async (req, res) => {
  try {
    const url = `https://geoserver.geoportal.gov.ph/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geoportal:psa_administrative_municipality&outputFormat=application/json&CQL_FILTER=mun_code='${MUNICIPALITY_CODE}'`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (response.ok) {
      const geojson = await response.json();
      if (geojson.features?.length > 0) {
        return res.json({ success: true, source: "geoportal", data: geojson });
      }
    }
  } catch (e) {
    console.log("Geoportal municipality unavailable, using embedded fallback");
  }

  if (embeddedMunicipalityGeoJSON) {
    return res.json({
      success: true,
      source: "embedded",
      data: embeddedMunicipalityGeoJSON,
    });
  }

  res
    .status(500)
    .json({ success: false, message: "Municipality boundary unavailable" });
});

module.exports = router;
