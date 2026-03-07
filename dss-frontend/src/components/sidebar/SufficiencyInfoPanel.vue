<template>
  <div v-if="barangayData" class="px-4 py-3 border-t border-gray-600 text-sm">
    <div class="dss-layers-header -mx-4 mb-3">Information</div>

    <!-- Header module + barangay name -->
    <p class="text-base text-[#2c2c2c] font-bold mb-3">
      Machine Recommendation | Machine (hp)
    </p>
    <p class="text-base mb-3 text-semibold">
      <strong class="text-[#2c2c2c]">Barangay:</strong>
      {{ formatName(barangayData.barangay) }}
    </p>

    <!-- Rice Area -->
    <p class="text-base mb-3 text-semibold">
      <strong class="text-[#2c2c2c]">Rice Area:</strong>
      {{ barangayData.riceArea?.toFixed(4) }}
    </p>
    <!-- <div class=" text-base text-[#2c2c2c] mb-1">
      <span class="text-[#2c2c2c]">Rice Area (Ha):</span>
      <span class="text-[#2c2c2c]">{{
        barangayData.riceArea?.toFixed(4)
      }}</span>
    </div> -->

    <!-- Existing Machines -->
    <p class="text-base text-[#2c2c2c] font-bold mb-3">Existing Machines:</p>
    <div class="text-base space-y-0.5 mb-3">
      <p
        v-for="(m, i) in parseMachines(barangayData.existingMachines)"
        :key="'ex' + i"
        class="flex items-start gap-1 text-white"
      >
        {{ m }}
      </p>
    </div>

    <!-- Machine Recommendation  -->
    <!-- <p
      class="text-base text-[#2c2c2c] font-semibold mt-2 mb-1 uppercase tracking-wider"
    >
      Recommended Machines
    </p>
    <div class="text-base text-white pace-y-0.5 mb-3">
      <p
        v-for="(m, i) in parseMachines(barangayData.machineRecommendation)"
        :key="'rec' + i"
        class="flex items-start gap-1 text-white"
      >
        {{ m }}
      </p>
    </div> -->

    <!-- Final mechanization level + status -->
    <div class="border-t border-gray-600 pt-2 space-y-1">
      <div class="text-base">
        <span class="text-base text-[#2c2c2c] font-bold mb-3"
          >Current Mechanization Level:
        </span>
        <span class="text-white">{{ barangayData.initialHP?.toFixed(6) }}</span>
      </div>
      <!-- <div class=" text-base">
        <span class="text-[#2c2c2c]">Final Level (hp/ha):</span>
        <span class="text-yellow-300 font-bold">{{
          barangayData.finalHP?.toFixed(3)
        }}</span>
      </div> -->
      <div class="text-base">
        <span class="text-base text-[#2c2c2c] font-bold mb-3">Status: </span>
        <span class="text-white">
          {{ barangayData.status }}
        </span>
      </div>
      <!-- <div class=" text-base mt-1">
        <span class="text-[#2c2c2c]">Status:</span>
        <span
          class="font-bold"
          :class="
            barangayData.status === 'SUFFICIENT'
              ? 'text-green-400'
              : 'text-red-400'
          "
        >
          {{
            barangayData.status === "SUFFICIENT"
              ? "Sufficiency Achieved"
              : "Not Sufficient"
          }}
        </span>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDSSStore } from "@/stores/dss";

const store = useDSSStore();

const barangayData = computed(() =>
  store.selectedBarangay
    ? store.getBarangaySufficiencyData(store.selectedBarangay)
    : null,
);

function formatName(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}

function parseMachines(str) {
  if (!str || str === "No existing machine") return ["No existing machine"];
  return str
    .split(";")
    .map((m) => m.trim())
    .filter(Boolean);
}
</script>
