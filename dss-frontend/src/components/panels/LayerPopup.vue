<script setup>
import { computed } from "vue";
import { useDSSStore } from "@/stores/dss";
import DonutChart from "@/components/DonutChart.vue";

const store = useDSSStore();

function formatName(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}

function getMechData(barangay) {
  return store.mechanizationData.find(
    (d) => d.barangay === barangay?.toUpperCase(),
  );
}

const suffData = computed(() => {
  if (!store.selectedBarangay) return null;
  return store.getBarangaySufficiencyData(store.selectedBarangay);
});

const irrigatedData = computed(() => {
  if (!store.hoveredBarangay || !store.suitabilityData) return null;
  return store.suitabilityData.irrigatedByBarangay?.find(
    (d) => d.barangay.toUpperCase() === store.hoveredBarangay,
  );
});

const rainfedData = computed(() => {
  if (!store.hoveredBarangay || !store.suitabilityData) return null;
  return store.suitabilityData.rainfedByBarangay?.find(
    (d) => d.barangay.toUpperCase() === store.hoveredBarangay,
  );
});

// Actual totals from suitability data for correct donut proportions
const irrigatedDonutSegments = computed(() => {
  if (!store.suitabilityData) return [];
  const rows = store.suitabilityData.irrigatedByBarangay || [];
  const suitable = rows.reduce((s, d) => s + (d.suitable || 0), 0);
  const moderate = rows.reduce((s, d) => s + (d.moderate || 0), 0);
  return [
    { value: suitable, color: "#F39C12" },
    { value: moderate, color: "#FDEBD0" },
  ];
});

const rainfedDonutSegments = computed(() => {
  if (!store.suitabilityData) return [];
  const rows = store.suitabilityData.rainfedByBarangay || [];
  const suitable = rows.reduce((s, d) => s + (d.suitable || 0), 0);
  const moderate = rows.reduce((s, d) => s + (d.moderate || 0), 0);
  return [
    { value: suitable, color: "#F39C12" },
    { value: moderate, color: "#FDEBD0" },
  ];
});

// Mechanization level segments for donut chart
const mechSegments = computed(() => {
  const data = store.mechanizationData;
  if (!data.length) return [];
  const low = data.filter(
    (d) => d.mechanizationLevel > 0 && d.mechanizationLevel < 0.9,
  ).length;
  const moderate = data.filter(
    (d) => d.mechanizationLevel >= 0.9 && d.mechanizationLevel < 3.0,
  ).length;
  const high = data.filter((d) => d.mechanizationLevel >= 3.0).length;
  return [
    { value: low, color: "#FDEBD0" },
    { value: moderate, color: "#F39C12" },
    { value: high, color: "#E74C3C" },
  ];
});

const mechLegend = computed(() => {
  const data = store.mechanizationData;
  return [
    {
      label: "Low (0.1-0.9)",
      color: "#FDEBD0",
      count: data.filter(
        (d) => d.mechanizationLevel > 0 && d.mechanizationLevel < 0.9,
      ).length,
    },
    {
      label: "Moderate (0.9-3.0)",
      color: "#F39C12",
      count: data.filter(
        (d) => d.mechanizationLevel >= 0.9 && d.mechanizationLevel < 3.0,
      ).length,
    },
    {
      label: "High (3.0-5.5)",
      color: "#E74C3C",
      count: data.filter((d) => d.mechanizationLevel >= 3.0).length,
    },
  ];
});

const hpSegments = computed(() => [
  {
    value: store.mechanizationData.filter((d) => d.effectiveHP < 67).length,
    color: "#FDEBD0",
  },
  {
    value: store.mechanizationData.filter(
      (d) => d.effectiveHP >= 67 && d.effectiveHP < 185,
    ).length,
    color: "#F39C12",
  },
  {
    value: store.mechanizationData.filter((d) => d.effectiveHP >= 185).length,
    color: "#E74C3C",
  },
]);

const hpLegend = [
  { label: "0 to 67 hp", color: "#FDEBD0" },
  { label: "67 to 185 hp", color: "#F39C12" },
  { label: "185 to 282 hp", color: "#E74C3C" },
];

const lguSegments = computed(() => [
  {
    value: store.mechanizationData.filter((d) => d.riceArea < 54).length,
    color: "#FDEBD0",
  },
  {
    value: store.mechanizationData.filter(
      (d) => d.riceArea >= 54 && d.riceArea < 185,
    ).length,
    color: "#F39C12",
  },
  {
    value: store.mechanizationData.filter((d) => d.riceArea >= 185).length,
    color: "#E74C3C",
  },
]);

const lguLegend = [
  { label: "2 to 54 ha", color: "#FDEBD0" },
  { label: "54 to 185 ha", color: "#F39C12" },
  { label: "185 to 365 ha", color: "#E74C3C" },
];

const slopeLegend = [
  { label: "Flat", color: "#90EE90" },
  { label: "Gently Undulating", color: "#27AE60" },
  { label: "Undulating", color: "#F1C40F" },
  { label: "Strongly Undulating", color: "#F39C12" },
  { label: "Mountainous", color: "#E74C3C" },
  { label: "Steep", color: "#8B0000" },
];
</script>

<template>
  <div class="dss-popup">
    <button
      @click="store.showPopup = false"
      class="absolute top-2 right-3 text-white text-lg leading-none"
    >
      ✕
    </button>

    <!-- MECHANIZATION LEVEL popup -->
    <template
      v-if="
        store.activeModule === 'mechanization' &&
        store.layers.mechanizationLevel
      "
    >
      <p class="dss-popup-title">Mechanization Level (hp/ha)</p>

      <DonutChart :segments="mechSegments" />
      <!-- <div class="text-center mb-3">
        <div
          v-if="store.hoveredBarangay"
          class="bg-gray-700 rounded px-3 py-1 inline-block mb-2"
        >
          <p class="text-sm font-semibold text-white">
            {{ formatName(store.hoveredBarangay) }}
          </p>
          <p class="text-lg text-yellow-300">
            {{
              getMechData(store.hoveredBarangay)?.mechanizationLevel?.toFixed(6)
            }}
          </p>
        </div>
      </div> -->
      <div class="mt-3 space-y-1">
        <div
          v-for="s in mechLegend"
          :key="s.label"
          class="flex items-center gap-2 text-base text-white"
        >
          <div
            class="w-3 h-3 rounded-sm"
            :style="{ background: s.color }"
          ></div>
          {{ s.label }}:
          <span class="text-yellow-300 ml-auto">{{ s.count }} barangay</span>
        </div>
      </div>
    </template>

    <!-- HP AVAILABILITY popup -->
    <template
      v-else-if="
        store.activeModule === 'mechanization' && store.layers.horsepower
      "
    >
      <p class="dss-popup-title">Effective Horsepower (hp)</p>

      <DonutChart :segments="hpSegments" />
      <!-- <div v-if="store.hoveredBarangay" class="text-center mb-3">
        <div class="bg-gray-700 rounded px-3 py-1 inline-block">
          <p class="text-sm font-semibold text-white">
            {{ formatName(store.hoveredBarangay) }}
          </p>
          <p class="text-lg text-yellow-300">
            {{ getMechData(store.hoveredBarangay)?.effectiveHP }} hp
          </p>
        </div>
      </div> -->
      <div class="mt-3 space-y-1">
        <div
          v-for="s in hpLegend"
          :key="s.label"
          class="flex items-center gap-2 text-base text-white"
        >
          <div
            class="w-3 h-3 rounded-sm"
            :style="{ background: s.color }"
          ></div>
          {{ s.label }}
        </div>
      </div>
    </template>

    <!-- LGU SERVICE AREA popup -->
    <template
      v-else-if="
        store.activeModule === 'mechanization' && store.layers.lguServiceArea
      "
    >
      <p class="dss-popup-title">LGU Service Area (ha)</p>

      <DonutChart :segments="lguSegments" />
      <!-- <div v-if="store.hoveredBarangay" class="text-center mb-3">
        <div class="bg-gray-700 rounded px-3 py-1 inline-block">
          <p class="text-sm font-semibold text-white">
            {{ formatName(store.hoveredBarangay) }}
          </p>
          <p class="text-lg text-yellow-300">
            {{ getMechData(store.hoveredBarangay)?.riceArea?.toFixed(4) }} ha
          </p>
        </div>
      </div> -->
      <div class="mt-3 space-y-1">
        <div
          v-for="s in lguLegend"
          :key="s.label"
          class="flex items-center gap-2 text-base text-white"
        >
          <div
            class="w-3 h-3 rounded-sm"
            :style="{ background: s.color }"
          ></div>
          {{ s.label }}
        </div>
      </div>
    </template>

    <!-- MACHINE RECOMMENDATION popup (Sufficiency) -->
    <template
      v-else-if="store.activeModule === 'sufficiency' && store.selectedBarangay"
    >
      <p class="dss-popup-title">Machine Recommendation</p>
      <div v-if="suffData" class="text-base text-white space-y-1 mt-2">
        <p class="text-center mb-2">
          {{ suffData.machineRecommendation }}
        </p>
        <div class="pt-10">
          <p class="font-bold">
            Final:
            <span class="font-bold text-yellow-300"
              >{{ suffData.finalHP.toFixed(3) }} Hp/Ha</span
            >
          </p>
          <p class="font-bold">
            Status:
            <span
              :class="
                suffData.status === 'SUFFICIENT'
                  ? 'text-yellow-300'
                  : 'text-red-400'
              "
              class="font-bold"
            >
              {{
                suffData.status === "SUFFICIENT"
                  ? "SUFFICIENCY ACHIEVED"
                  : "NOT SUFFICIENT"
              }}
            </span>
          </p>
        </div>
      </div>
    </template>

    <!-- ROAD PROXIMITY popup -->
    <template
      v-else-if="
        store.activeModule === 'suitability' && store.layers.roadProximity
      "
    >
      <p class="dss-popup-title">Road Proximity</p>
      <DonutChart
        :segments="[
          {
            value: store.suitabilityData?.summary.roadProximity.suitable,
            color: '#F39C12',
          },
          {
            value: store.suitabilityData?.summary.roadProximity.moderately,
            color: '#FDEBD0',
          },
        ]"
      />
      <div class="mt-2 text-center text-base text-white">
        Rice Mechanization
      </div>
      <div class="mt-4 space-y-1">
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #f39c12"></div>
          Suitable
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #fdebd0"></div>
          Moderately Suitable
        </div>
      </div>
    </template>

    <!-- WATER USE popup -->
    <template
      v-else-if="store.activeModule === 'suitability' && store.layers.waterUse"
    >
      <p class="dss-popup-title">Water Use</p>
      <DonutChart
        :segments="[
          {
            value: store.suitabilityData?.summary.waterUse.suitable,
            color: '#F39C12',
          },
          {
            value: store.suitabilityData?.summary.waterUse.notSuitable,
            color: '#FDEBD0',
          },
        ]"
      />
      <div class="mt-2 text-center text-base text-white">
        Rice Mechanization
      </div>
      <div class="mt-4 space-y-1">
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #f39c12"></div>
          Suitable
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #fdebd0"></div>
          Moderately Suitable
        </div>
      </div>
    </template>

    <!-- RICE AREA popup -->
    <template
      v-else-if="store.activeModule === 'suitability' && store.layers.riceArea"
    >
      <p class="dss-popup-title">Total Rice Area</p>
      <DonutChart :segments="[{ value: 1, color: '#27AE60' }]" />
      <p class="text-center text-lg font-bold text-white mt-2">
        {{ store.suitabilityData?.summary.totalRiceArea.toFixed(3) }} Ha
      </p>
      <div class="mt-4 space-y-1">
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #27ae60"></div>
          Rice Area
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm bg-white border border-gray-500"></div>
          Not interest
        </div>
      </div>
    </template>

    <!-- SLOPE CLASS popup -->
    <template
      v-else-if="
        store.activeModule === 'suitability' && store.layers.slopeClass
      "
    >
      <p class="dss-popup-title">Slope Class</p>
      <DonutChart
        :segments="[
          { value: 60, color: '#90EE90' },
          { value: 20, color: '#27AE60' },
          { value: 12, color: '#F1C40F' },
          { value: 5, color: '#F39C12' },
          { value: 2, color: '#E74C3C' },
          { value: 1, color: '#8B0000' },
        ]"
      />
      <div class="mt-4 space-y-1">
        <div
          v-for="s in slopeLegend"
          :key="s.label"
          class="flex items-center gap-2 text-base text-white"
        >
          <div
            class="w-3 h-3 rounded-sm"
            :style="{ background: s.color }"
          ></div>
          {{ s.label }}
        </div>
      </div>
    </template>

    <!-- SUITABLE SLOPE popup -->
    <template
      v-else-if="
        store.activeModule === 'suitability' && store.layers.suitableSlope
      "
    >
      <p class="dss-popup-title">Slope Map</p>
      <DonutChart
        :segments="[
          {
            value: store.suitabilityData?.summary.slope.suitable,
            color: '#27AE60',
          },
          {
            value: store.suitabilityData?.summary.slope.moderately,
            color: '#F1C40F',
          },
          { value: 200, color: '#E74C3C' },
          { value: 100, color: '#8B0000' },
        ]"
      />
      <div class="mt-2 text-center text-base text-white">
        Rice Mechanization
      </div>
      <div class="mt-4 space-y-1">
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #27ae60"></div>
          Suitable
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #f1c40f"></div>
          Moderately Suitable
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #e74c3c"></div>
          Severely Suitable
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #8b0000"></div>
          Not Suitable
        </div>
      </div>
    </template>

    <!-- SOIL TEXTURE CLASS -->
    <template
      v-else-if="
        store.activeModule === 'suitability' && store.layers.soilTextureClass
      "
    >
      <p class="dss-popup-title">Soil Texture Class</p>
      <DonutChart
        :segments="[
          { value: 4124.568, color: '#E07060' },
          { value: 3032.178, color: '#A0937D' },
          { value: 376.007, color: '#F1C40F' },
          { value: 18.228, color: '#F5EED0' },
        ]"
      />
      <div class="mt-4 space-y-1">
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #e07060"></div>
          Clay
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #f1c40f"></div>
          Fine Sand
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #f5eed0"></div>
          Fine Sandy Loam
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #a0937d"></div>
          Silt Loam
        </div>
      </div>
    </template>

    <template
      v-else-if="
        store.activeModule === 'suitability' && store.layers.suitableSoilTexture
      "
    >
      <p class="dss-popup-title">Soil Texture</p>
      <DonutChart
        :segments="[
          {
            value: store.suitabilityData?.summary.soilTexture.suitable,
            color: '#F39C12',
          },
          {
            value: store.suitabilityData?.summary.soilTexture.moderately,
            color: '#FDEBD0',
          },
        ]"
      />
      <div class="mt-2 text-center text-base text-white">
        Rice Mechanization
      </div>
      <div class="mt-4 space-y-1">
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #f39c12"></div>
          Suitable
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #fdebd0"></div>
          Moderately Suitable
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #e74c3c"></div>
          Severely Suitable
        </div>
      </div>
    </template>

    <!-- IRRIGATED AREA popup -->
    <template
      v-else-if="
        store.activeModule === 'suitability' &&
        store.layers.suitabilityIrrigated
      "
    >
      <p class="dss-popup-title">Suitability Map</p>
      <p class="dss-popup-subtitle">Irrigated Area</p>
      <DonutChart :segments="irrigatedDonutSegments" />
      <p class="text-center text-lg font-bold text-white mt-1">
        {{ store.suitabilityData?.summary.irrigatedTotal?.toFixed(3) }} Ha
      </p>

      <!-- <div
        v-if="store.hoveredBarangay && irrigatedData"
        class="mt-3 border border-gray-500 rounded p-2 text-base bg-gray-800"
      >
        <p class="font-bold text-white text-sm mb-1">
          {{ formatName(store.hoveredBarangay) }}
        </p>
        <div class="flex items-center gap-2 mb-0.5">
          <div
            class="w-3 h-3 rounded-sm shrink-0"
            style="background: #f39c12"
          ></div>
          <span class="text-white">{{
            irrigatedData.suitable?.toFixed(3)
          }}</span>
        </div>
        <div class="flex items-center gap-2">
          <div
            class="w-3 h-3 rounded-sm shrink-0"
            style="background: #fdebd0"
          ></div>
          <span class="text-white">{{
            irrigatedData.moderate?.toFixed(3)
          }}</span>
        </div>
      </div> -->
      <div class="mt-3 text-center text-base text-white font-semibold">
        Rice Mechanization
      </div>
      <div class="mt-4 space-y-1">
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #f39c12"></div>
          Suitable
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #fdebd0"></div>
          Moderately Suitable
        </div>
      </div>
    </template>

    <template
      v-else-if="
        store.activeModule === 'suitability' && store.layers.suitabilityRainfed
      "
    >
      <p class="dss-popup-title">Suitability Map</p>
      <p class="dss-popup-subtitle">Rainfed Area</p>
      <DonutChart :segments="rainfedDonutSegments" />
      <p class="text-center text-lg font-bold text-white mt-1">
        {{ store.suitabilityData?.summary.rainfedTotal?.toFixed(3) }} Ha
      </p>
      <!-- Hover: barangay name + two values exactly like page 11 -->
      <!-- <div
        v-if="store.hoveredBarangay && rainfedData"
        class="mt-3 border border-gray-500 rounded p-2 text-base bg-gray-800"
      >
        <p class="font-bold text-white text-sm mb-1">
          {{ formatName(store.hoveredBarangay) }}
        </p>
        <div class="flex items-center gap-2 mb-0.5">
          <div
            class="w-3 h-3 rounded-sm shrink-0"
            style="background: #f39c12"
          ></div>
          <span class="text-white">{{ rainfedData.suitable?.toFixed(3) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <div
            class="w-3 h-3 rounded-sm shrink-0"
            style="background: #fdebd0"
          ></div>
          <span class="text-white">{{ rainfedData.moderate?.toFixed(3) }}</span>
        </div>
      </div> -->
      <div class="mt-3 text-center text-base text-white font-semibold">
        Rice Mechanization
      </div>
      <div class="mt-4 space-y-1">
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #f39c12"></div>
          Suitable
        </div>
        <div class="flex items-center gap-2 text-base text-white">
          <div class="w-3 h-3 rounded-sm" style="background: #fdebd0"></div>
          Moderately Suitable
        </div>
      </div>
    </template>

    <!-- DEFAULT: show module info -->
    <template v-else>
      <p class="dss-popup-title text-sm">
        {{ store.activeModule?.toUpperCase() }}
      </p>
      <p class="text-base text-white text-center mt-2">
        Select a layer to view data
      </p>
    </template>
  </div>
</template>
