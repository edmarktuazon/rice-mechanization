<script setup>
import { ref } from "vue";
import { useDSSStore } from "@/stores/dss";
import LayersPanel from "./LayersPanel.vue";
import SufficiencyInfoPanel from "./SufficiencyInfoPanel.vue";

const store = useDSSStore();
const sidebarVisible = ref(false);

function handleSearch() {
  const q = store.searchQuery.trim();
  if (!q) return;
  store.selectBarangay(q);
  if (store.activeModule !== "sufficiency") {
    store.setActiveModule("sufficiency");
  }
  store.layers.machineRecommendation = true;
}

function showSidebar() {
  sidebarVisible.value = true;
}

function hideSidebar() {
  sidebarVisible.value = false;
}
</script>

<template>
  <button
    class="lg:hidden fixed top-[130px] left-5 z-10 flex flex-col gap-1.5 p-2 bg-[#4A4A4A] border border-[#666] rounded-md shadow-lg"
    @click="showSidebar"
  >
    <span class="block w-5 h-0.5 bg-[#CCC] rounded"></span>
    <span class="block w-5 h-0.5 bg-[#CCC] rounded"></span>
    <span class="block w-5 h-0.5 bg-[#CCC] rounded"></span>
  </button>

  <Transition name="backdrop-fade">
    <div
      v-if="sidebarVisible"
      class="lg:hidden fixed inset-0 z-[1100] bg-black/50"
      @click="hideSidebar"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    class="dss-sidebar"
    :class="[
      'fixed lg:static top-0 left-0 h-full z-[1200]',
      'transition-transform duration-300 ease-in-out',
      sidebarVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <div class="px-3 py-2 flex items-center gap-2 border-b border-gray-600">
      <button
        class="flex flex-col gap-1.5 p-1 shrink-0"
        @click="store.showBarangayList = !store.showBarangayList"
      >
        <span class="block w-6 h-0.5 bg-white"></span>
        <span class="block w-6 h-0.5 bg-white"></span>
        <span class="block w-6 h-0.5 bg-white"></span>
      </button>

      <div class="relative flex-1">
        <span class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          v-model="store.searchQuery"
          type="text"
          class="dss-search"
          @keyup.enter="handleSearch"
        />
        <button
          v-if="store.searchQuery"
          @click="
            store.searchQuery = '';
            store.selectedBarangay = null;
            store.showPopup = false;
          "
          class="absolute right-2 top-1/2 -translate-y-1/2 text-red-400 text-xs"
        >
          ✕
        </button>
      </div>

      <button
        class="lg:hidden text-white text-xl px-1 shrink-0"
        @click="hideSidebar"
      >
        ✕
      </button>
    </div>

    <!-- Modules -->
    <div class="border-b border-white">
      <div
        class="dss-sidebar-section"
        @click="store.setActiveModule('suitability')"
      >
        <span class="dss-sidebar-title">Suitability</span>
      </div>
      <Transition name="fade">
        <div v-if="store.activeModule === 'suitability'">
          <div
            v-for="item in store.suitabilityLayers"
            :key="item.key"
            class="dss-sidebar-section py-2 pl-6"
            :class="{ 'text-yellow-400': store.layers[item.key] }"
            @click.stop="store.toggleLayer(item.key)"
          >
            <span class="text-base">{{ item.label }}</span>
          </div>
        </div>
      </Transition>

      <div
        class="dss-sidebar-section"
        @click="store.setActiveModule('mechanization')"
      >
        <span class="dss-sidebar-title">Mechanization Level</span>
      </div>
      <Transition name="fade">
        <div v-if="store.activeModule === 'mechanization'">
          <div
            v-for="item in store.mechanizationLayers"
            :key="item.key"
            class="dss-sidebar-section py-2 pl-6"
            :class="{ 'text-yellow-400': store.layers[item.key] }"
            @click.stop="store.toggleLayer(item.key)"
          >
            <span class="text-base">{{ item.label }}</span>
          </div>
        </div>
      </Transition>

      <div
        class="dss-sidebar-section"
        @click="store.setActiveModule('sufficiency')"
      >
        <span class="dss-sidebar-title">Sufficiency</span>
      </div>
      <Transition name="fade">
        <div v-if="store.activeModule === 'sufficiency'">
          <div
            v-for="item in store.sufficiencyLayers"
            :key="item.key"
            class="dss-sidebar-section py-2 pl-6"
            :class="{ 'text-yellow-400': store.layers[item.key] }"
            @click.stop="store.toggleLayer(item.key)"
          >
            <span class="text-sm">{{ item.label }}</span>
          </div>
          <SufficiencyInfoPanel v-if="store.selectedBarangay" />
        </div>
      </Transition>
    </div>

    <!-- Layers panel -->
    <div class="dss-layers-panel flex-1">
      <div class="dss-layers-header">Layers</div>
      <LayersPanel />
    </div>
  </aside>
</template>

<style scoped>
.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
  transition: opacity 0.22s ease;
}
.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  opacity: 0;
}
</style>
