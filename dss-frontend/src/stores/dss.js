import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export const useDSSStore = defineStore("dss", () => {
  const activeModule = ref("suitability");
  const activeLayer = ref(null);

  const mechanizationData = ref([]);
  const sufficiencyData = ref([]);
  const suitabilityData = ref(null);

  const mapCenter = ref({ lat: 14.8779, lng: 120.4617 });
  const mapZoom = ref(12);
  const hoveredBarangay = ref(null);
  const selectedBarangay = ref(null);
  const mapCoords = ref({ lat: 14.8835, lng: 120.433 });

  const showPopup = ref(false);
  const popupData = ref(null);
  const searchQuery = ref("");
  const showBarangayList = ref(false);
  const isLoading = ref(false);

  const layers = ref({
    municipalBoundary: true,
    barangayBoundary: true,
    roadNetwork: false,
    roadProximity: false,
    waterUse: false,
    riceArea: false,
    suitabilityIrrigated: false,
    suitabilityRainfed: false,
    slopeClass: false,
    suitableSlope: false,
    soilTextureClass: false,
    suitableSoilTexture: false,
    depthClass: false,
    depthSuitability: false,
    mechanizationLevel: false,
    horsepower: false,
    lguServiceArea: false,
    machineRecommendation: false,
  });

  const suitabilityLayers = computed(() => [
    { key: "municipalBoundary", label: "Municipal Boundary" },
    { key: "barangayBoundary", label: "Barangay Boundary (Name)" },
    { key: "roadNetwork", label: "Road Network" },
    { key: "roadProximity", label: "Road Network Proximity" },
    { key: "waterUse", label: "Water Use" },
    { key: "riceArea", label: "Total Rice Area" },
    { key: "suitabilityIrrigated", label: "SUITABILITY MAP - Irrigated Area" },
    { key: "suitabilityRainfed", label: "SUITABILITY MAP - Rainfed Area" },
    { key: "slopeClass", label: "Slope Class" },
    { key: "suitableSlope", label: "Suitable Slope" },
    { key: "soilTextureClass", label: "Soil Texture Class" },
    { key: "suitableSoilTexture", label: "Suitable Soil Texture" },
    { key: "depthClass", label: "Depth Class" },
    { key: "depthSuitability", label: "Depth Suitability" },
  ]);

  const mechanizationLayers = computed(() => [
    { key: "mechanizationLevel", label: "Mechanization Level (hp/ha)" },
    { key: "horsepower", label: "Horsepower Availability" },
    { key: "lguServiceArea", label: "LGU Service Area" },
  ]);

  const sufficiencyLayers = computed(() => [
    { key: "machineRecommendation", label: "Machine Recommendation" },
  ]);

  // Data loaders 
  async function loadMechanizationData() {
    if (mechanizationData.value.length > 0) return;
    try {
      isLoading.value = true;
      const { data } = await axios.get(`${API_BASE}/mechanization`);
      mechanizationData.value = data.data;
    } catch (e) {
      console.error("Failed to load mechanization data", e);
    } finally {
      isLoading.value = false;
    }
  }

  async function loadSufficiencyData() {
    if (sufficiencyData.value.length > 0) return;
    try {
      isLoading.value = true;
      const { data } = await axios.get(`${API_BASE}/sufficiency`);
      sufficiencyData.value = data.data;
    } catch (e) {
      console.error("Failed to load sufficiency data", e);
    } finally {
      isLoading.value = false;
    }
  }

  async function loadSuitabilityData() {
    if (suitabilityData.value) return;
    try {
      isLoading.value = true;
      const { data } = await axios.get(`${API_BASE}/suitability`);
      suitabilityData.value = data.data;
    } catch (e) {
      console.error("Failed to load suitability data", e);
    } finally {
      isLoading.value = false;
    }
  }

  // Actions
  function setActiveModule(module) {
    if (activeModule.value !== module) {
      // Only reset when actually switching modules
      activeLayer.value = null;
      showPopup.value = false;
      selectedBarangay.value = null;
      searchQuery.value = "";
    }
    activeModule.value = module;
  }

  function toggleLayer(key) {
    // These are always on base layers, never auto-disable them
    const baseLayers = ["municipalBoundary", "barangayBoundary", "roadNetwork"];
    // Data layers are only one active at a time per module
    const suitDataKeys = [
      "roadProximity",
      "waterUse",
      "riceArea",
      "suitabilityIrrigated",
      "suitabilityRainfed",
      "slopeClass",
      "suitableSlope",
      "soilTextureClass",
      "suitableSoilTexture",
      "depthClass",
      "depthSuitability",
    ];
    const mechDataKeys = ["mechanizationLevel", "horsepower", "lguServiceArea"];

    if (!layers.value[key]) {
      // Turning ON, turn off sibling data layers (not base layers)
      if (suitDataKeys.includes(key))
        suitDataKeys.forEach((k) => {
          if (k !== key) layers.value[k] = false;
        });
      if (mechDataKeys.includes(key))
        mechDataKeys.forEach((k) => {
          if (k !== key) layers.value[k] = false;
        });
      layers.value[key] = true;
      activeLayer.value = key;
      showPopup.value = true;
    } else {
      // Turning OFF
      layers.value[key] = false;
      if (activeLayer.value === key) {
        activeLayer.value = null;
        showPopup.value = false;
      }
    }
  }

  function showLayerPopup(layerKey) {
    showPopup.value = true;
    activeLayer.value = layerKey;
  }

  function selectBarangay(barangayName) {
    if (!barangayName) return;
    const normalized = barangayName.trim().toUpperCase();

    // Try to find in sufficiency data
    const suffData = sufficiencyData.value.find(
      (d) =>
        d.barangay.toUpperCase().includes(normalized) ||
        normalized.includes(d.barangay.toUpperCase()),
    );
    const mechData = mechanizationData.value.find(
      (d) =>
        d.barangay.toUpperCase().includes(normalized) ||
        normalized.includes(d.barangay.toUpperCase()),
    );

    const found = suffData?.barangay || mechData?.barangay || normalized;
    selectedBarangay.value = found;

    if (suffData) {
      popupData.value = {
        ...suffData,
        mechLevel: mechData?.mechanizationLevel || suffData.initialHP,
      };
      showPopup.value = true;
    }
  }

  function updateCoords(lat, lng) {
    mapCoords.value = {
      lat: parseFloat(parseFloat(lat).toFixed(4)),
      lng: parseFloat(parseFloat(lng).toFixed(4)),
    };
  }

  function getMechanizationColor(level) {
    if (!level || level === 0) return "#CCCCCC";
    if (level < 0.9) return "#FDEBD0";
    if (level < 3.0) return "#F39C12";
    return "#E74C3C";
  }

  function getMechanizationClass(level) {
    if (!level || level === 0) return "NO DATA";
    if (level < 0.9) return "Low";
    if (level < 3.0) return "Moderate";
    return "High";
  }

  function getBarangayMechData(name) {
    if (!name) return null;
    return mechanizationData.value.find(
      (d) => d.barangay.toLowerCase() === name.toLowerCase(),
    );
  }

  function getBarangaySufficiencyData(name) {
    if (!name) return null;
    const n = name.toUpperCase();
    return sufficiencyData.value.find(
      (d) =>
        d.barangay.toUpperCase() === n ||
        d.barangay.toUpperCase().replace(/[^A-Z ]/g, "") ===
          n.replace(/[^A-Z ]/g, ""),
    );
  }

  return {
    activeModule,
    activeLayer,
    mechanizationData,
    sufficiencyData,
    suitabilityData,
    mapCenter,
    mapZoom,
    hoveredBarangay,
    selectedBarangay,
    mapCoords,
    showPopup,
    popupData,
    searchQuery,
    showBarangayList,
    isLoading,
    layers,
    suitabilityLayers,
    mechanizationLayers,
    sufficiencyLayers,
    loadMechanizationData,
    loadSufficiencyData,
    loadSuitabilityData,
    setActiveModule,
    toggleLayer,
    showLayerPopup,
    selectBarangay,
    updateCoords,
    getMechanizationColor,
    getMechanizationClass,
    getBarangayMechData,
    getBarangaySufficiencyData,
  };
});
