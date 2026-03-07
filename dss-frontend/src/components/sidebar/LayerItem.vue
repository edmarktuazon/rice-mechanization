<script setup>
import { useDSSStore } from "@/stores/dss";
defineProps({ layerKey: String, label: String });
const store = useDSSStore();
</script>

<template>
  <div class="border-b border-gray-600">
    <!-- Layer header row -->
    <div class="dss-layer-item">
      <input
        type="checkbox"
        :checked="store.layers[layerKey]"
        @change="store.toggleLayer(layerKey)"
        class="accent-white w-4 h-4 cursor-pointer shrink-0"
      />
      <span
        class="flex-1 text-[#2c2c2c] text-base font-bold cursor-pointer"
        @click="store.toggleLayer(layerKey)"
        >{{ label }}</span
      >
      <button
        @click="store.toggleLayer(layerKey)"
        class="text-[#2c2c2c] text-base ml-2 shrink-0"
        title="Remove layer"
      >
        ✕
      </button>
    </div>

    <div class="pb-1">
      <slot name="legend" />
    </div>
  </div>
</template>
