<script setup>
import { useDSSStore } from "@/stores/dss";

const emit = defineEmits(["close"]);
const store = useDSSStore();

const barangays = [
  { num: 1, name: "Bangal" },
  { num: 2, name: "Bonifacio" },
  { num: 3, name: "Burgos" },
  { num: 4, name: "Colo" },
  { num: 5, name: "Daang Bago" },
  { num: 6, name: "Dalao" },
  { num: 7, name: "Del Pilar" },
  { num: 8, name: "Gen. Luna" },
  { num: 9, name: "Gomez" },
  { num: 10, name: "Happy Valley" },
  { num: 11, name: "Kataasan" },
  { num: 12, name: "Layac" },
  { num: 13, name: "Luacan" },
  { num: 14, name: "Mabini Proper" },
  { num: 15, name: "Mabini Ext." },
  { num: 16, name: "Magsaysay" },
  { num: 17, name: "Naparing" },
  { num: 18, name: "New San Jose" },
  { num: 19, name: "Old San Jose" },
  { num: 20, name: "Padre Dandan" },
  { num: 21, name: "Pag-asa" },
  { num: 22, name: "Pagalanggang" },
  { num: 23, name: "Pinulot" },
  { num: 24, name: "Pita" },
  { num: 25, name: "Rizal" },
  { num: 26, name: "Roosevelt" },
  { num: 27, name: "Roxas" },
  { num: 28, name: "Saguing" },
  { num: 29, name: "San Benito" },
  { num: 30, name: "San Isidro" },
  { num: 31, name: "San Pablo" },
  { num: 32, name: "San Ramon" },
  { num: 33, name: "San Simon" },
  { num: 34, name: "Santo Niño" },
  { num: 35, name: "Sapang Balas" },
  { num: 36, name: "Santa Isabel" },
  { num: 37, name: "Torres" },
  { num: 38, name: "Tucop" },
  { num: 39, name: "Zamora" },
  { num: 40, name: "Aquino" },
  { num: 41, name: "Bayan-bayanan" },
  { num: 42, name: "Maligaya" },
  { num: 43, name: "Payangan" },
  { num: 44, name: "Pentor" },
  { num: 45, name: "Tubo-tubo" },
  { num: 46, name: "Payumo" },
];

function selectBarangay(name) {
  store.searchQuery = name;
  store.selectBarangay(name);
  if (store.activeModule !== "sufficiency") {
    store.setActiveModule("sufficiency");
  }
  store.layers.machineRecommendation = true;
  emit("close");
}
</script>

<template>
  <div
    class="fixed inset-0 z-[9999] flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div
      class="relative rounded-lg shadow-2xl p-6 w-[560px] max-h-[80vh] overflow-y-auto bg-[#2c2c2c] lg:bg-black/30"
    >
      <button
        @click="$emit('close')"
        class="absolute top-3 right-4 text-gray-300 hover:text-white text-xl leading-none"
      >
        ✕
      </button>
      <p class="dss-popup-title text-3xl mb-1">Dinalupihan</p>
      <p class="dss-popup-subtitle">(Barangay)</p>

      <div class="grid grid-cols-3 gap-x-6 gap-y-1.5 text-xs mt-4">
        <div
          v-for="b in barangays"
          :key="b.num"
          class="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition-colors py-0.5"
          @click="selectBarangay(b.name)"
        >
          <span
            class="w-6 h-6 rounded-full border border-gray-500 bg-white flex items-center justify-center text-xs font-mono shrink-0 text-[#2c2c2c]"
          >
            {{ b.num }}
          </span>
          <span class="text-white lg:text-[#2c2c2c] text-sm font-semibold">{{
            b.name
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
