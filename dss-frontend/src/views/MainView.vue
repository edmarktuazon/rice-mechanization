<script setup>
import { onMounted } from "vue";
import DSSHeader from "@/components/DSSHeader.vue";
import DSSSidebar from "@/components/sidebar/DSSSidebar.vue";
import DSSMap from "@/components/map/DSSMap.vue";
import LayerPopup from "@/components/panels/LayerPopup.vue";
import MapLinkPanel from "@/components/panels/MapLinkPanel.vue";
import BarangayListModal from "@/components/panels/BarangayListModal.vue";
import { useDSSStore } from "@/stores/dss";

const store = useDSSStore();

onMounted(async () => {
  await Promise.all([
    store.loadSuitabilityData(),
    store.loadMechanizationData(),
    store.loadSufficiencyData(),
  ]);
});
</script>

<template>
  <div class="flex flex-col h-screen w-screen overflow-hidden">
    <DSSHeader />
    <div class="flex flex-1 overflow-hidden">
      <DSSSidebar />
      <div class="relative flex-1 overflow-hidden">
        <DSSMap />
        <div class="map-coords">
          Coordinates: {{ store.mapCoords.lng }}*, {{ store.mapCoords.lat }}*
        </div>

        <!-- Map layer external link panel (top-right of map) -->
        <MapLinkPanel />
        <!-- Coordinates bottom-right -->
        <div class="map-coords">
          Coordinates: {{ store.mapCoords.lng }}*, {{ store.mapCoords.lat }}*
        </div>

        <!-- Suitability/Sufficiency popup -->
        <Transition name="fade">
          <LayerPopup
            v-if="store.showPopup && store.activeModule !== 'mechanization'"
          />
        </Transition>

        <Transition name="fade">
          <LayerPopup v-if="store.showPopup" />
        </Transition>
      </div>
    </div>

    <Transition name="fade">
      <BarangayListModal
        v-if="store.showBarangayList"
        @close="store.showBarangayList = false"
      />
    </Transition>
  </div>
</template>
