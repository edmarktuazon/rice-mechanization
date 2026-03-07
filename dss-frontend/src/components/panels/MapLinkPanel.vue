<script setup>
import { computed } from "vue";
import { useDSSStore } from "@/stores/dss";

const store = useDSSStore();

const LAYER_LINKS = {
  barangayBoundary: {
    label: "Barangay Boundary",
    url: "https://quinjinn148-blip.github.io/BARANGAY-BOUNDARY/",
  },
  roadProximity: {
    label: "Road Network Proximity",
    url: "https://quinjinn148-blip.github.io/DINALUPIHAN-ROAD-NETWORK-PROXIMITY/",
  },
  waterUse: {
    label: "Water Use",
    url: "https://quinjinn148-blip.github.io/DINALUPIHAN-WATER-USE/",
  },
  riceArea: {
    label: "Total Rice Area",
    url: "https://quinjinn148-blip.github.io/DINALUPIHAN-TOTAL-RICE-AREA/",
  },
  suitabilityRainfed: {
    label: "Suitability Map – Rainfed",
    url: "https://quinjinn148-blip.github.io/SUITABILITY-MAP-RAINFED/",
  },
  suitabilityIrrigated: {
    label: "Suitability Map – Irrigated",
    url: "https://quinjinn148-blip.github.io/SUITABILITY-MAP-IRRIGATED/",
  },
  slopeClass: {
    label: "Slope Class",
    url: "https://quinjinn148-blip.github.io/DINALUPIHAN-SLOPE-CLASS/",
  },
  suitableSlope: {
    label: "Slope – Rice Area",
    url: "https://quinjinn148-blip.github.io/SLOPE-Rice-Area/",
  },
  soilTextureClass: {
    label: "Soil Texture Class",
    url: "https://quinjinn148-blip.github.io/DINALUPIHAN-SOIL-TEXTURE-CLASS/",
  },
  suitableSoilTexture: {
    label: "Suitable Soil Texture",
    url: "https://quinjinn148-blip.github.io/SOIL-TEXTURE-CLASS/",
  },
  depthClass: {
    label: "Depth Class",
    url: "https://quinjinn148-blip.github.io/DINALUPIHAN-DEPTH-CLASS/",
  },
  depthSuitability: {
    label: "Depth Suitability",
    url: "https://quinjinn148-blip.github.io/DINALUPIHAN-DEPTH-CLASS/",
  },
  // Mechanization
  lguServiceArea: {
    label: "LGU Service Area",
    url: "https://quinjinn148-blip.github.io/LGU-Service-Area/",
  },
  mechanizationLevel: {
    label: "Mechanization Level",
    url: "https://quinjinn148-blip.github.io/DINALUPIHAN-MECHANIZATION-LEVEL/",
  },
  horsepower: {
    label: "Horsepower Availability",
    url: "https://quinjinn148-blip.github.io/HORSEPOWER-AVAILABILITY/",
  },
};

const PRIORITY = [
  "mechanizationLevel",
  "horsepower",
  "lguServiceArea",
  "suitabilityIrrigated",
  "suitabilityRainfed",
  "roadProximity",
  "waterUse",
  "riceArea",
  "slopeClass",
  "suitableSlope",
  "soilTextureClass",
  "suitableSoilTexture",
  "depthClass",
  "depthSuitability",
  "barangayBoundary",
];

const activeLink = computed(() => {
  for (const key of PRIORITY) {
    if (store.layers[key] && LAYER_LINKS[key]) return LAYER_LINKS[key];
  }
  return null;
});
</script>

<template>
  <Transition name="link-slide">
    <div v-if="activeLink" class="map-link-panel">
      <div class="mlp-header">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F5A623"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="flex-shrink: 0; margin-top: 1px"
        >
          <path
            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
          />
          <path
            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          />
        </svg>
        <span class="mlp-header-text"
          >View full Map for accurate color legends</span
        >
      </div>

      <div class="mlp-layer-name">{{ activeLink.label }}</div>

      <a
        :href="activeLink.url"
        target="_blank"
        rel="noopener noreferrer"
        class="mlp-btn"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        Open Interactive Map
      </a>
    </div>
  </Transition>
</template>

<style scoped>
.map-link-panel {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 500;
  background: rgba(38, 38, 38, 0.96);

  border-radius: 8px;
  padding: 12px 14px 13px;
  width: 210px;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(6px);
  font-family: "Barlow Condensed", sans-serif;
}

.mlp-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 5px;
}

.mlp-header-text {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #f5a623;
}

.mlp-layer-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #eeeeee;
  letter-spacing: 0.03em;
  margin-bottom: 10px;
  line-height: 1.25;
  padding-left: 1px;
}

.mlp-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 7px 12px;
  background: linear-gradient(135deg, #f5a623 0%, #e08c10 100%);
  color: #1a1a1a;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition:
    filter 0.15s,
    transform 0.1s;
  box-sizing: border-box;
}

.mlp-btn:hover {
  filter: brightness(1.12);
  transform: translateY(-1px);
}

.mlp-btn:active {
  transform: translateY(0);
  filter: brightness(0.95);
}

.link-slide-enter-active,
.link-slide-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}
.link-slide-enter-from,
.link-slide-leave-to {
  opacity: 0;
  transform: translateX(18px);
}
</style>
