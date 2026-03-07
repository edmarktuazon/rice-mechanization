<template>
  <div class="text-sm">
    <!-- Suitability Module Layers -->
    <template v-if="store.activeModule === 'suitability'">
      <!-- Municipal Boundary -->
      <LayerItem layerKey="municipalBoundary" label="Municipal Boundary">
        <template #legend>
          <div
            class="ml-6 mt-1 flex items-center gap-2 text-base text-[#2c2c2c]"
          >
            <span class="w-4 h-0.5 bg-white inline-block"></span> Boundary
          </div>
        </template>
      </LayerItem>

      <!-- Barangay Boundary -->
      <LayerItem
        v-if="store.layers.barangayBoundary || store.layers.municipalBoundary"
        layerKey="barangayBoundary"
        label="Barangay Boundary (Name)"
      >
        <template #legend>
          <div
            class="ml-6 mt-1 flex items-center gap-2 text-base text-[#2c2c2c]"
          >
            <span class="w-4 h-0.5 bg-white inline-block"></span> Boundary
          </div>
        </template>
      </LayerItem>

      <!-- Road Network -->
      <LayerItem
        v-if="store.layers.roadNetwork"
        layerKey="roadNetwork"
        label="Road Network"
      >
        <template #legend>
          <div
            class="ml-6 mt-1 flex items-center gap-2 text-base text-[#2c2c2c]"
          >
            <span class="w-4 h-0.5 bg-white inline-block"></span> Road
          </div>
        </template>
      </LayerItem>

      <!-- Road Proximity -->
      <LayerItem
        v-if="store.layers.roadProximity"
        layerKey="roadProximity"
        label="Road Network Proximity"
      >
        <template #legend>
          <div class="ml-6 mt-4 space-y-1">
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #f39c12"></div>
              100 meters
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #fdebd0"></div>
              200 meters
            </div>
          </div>
        </template>
      </LayerItem>

      <!-- Water Use -->
      <LayerItem
        v-if="store.layers.waterUse"
        layerKey="waterUse"
        label="Water Use"
      >
        <template #legend>
          <div class="ml-6 mt-4 space-y-1">
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #f39c12"></div>
              Rainfed Area
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #fdebd0"></div>
              Irrigated Area
            </div>
          </div>
        </template>
      </LayerItem>

      <!-- Rice Area -->
      <LayerItem
        v-if="store.layers.riceArea"
        layerKey="riceArea"
        label="Total Rice Area"
      >
        <template #legend>
          <div
            class="ml-6 mt-1 flex items-center gap-2 text-base text-[#2c2c2c]"
          >
            <div class="w-3 h-3 rounded-sm" style="background: #27ae60"></div>
            Rice Area
          </div>
        </template>
      </LayerItem>

      <!-- Suitability Irrigated -->
      <LayerItem
        v-if="store.layers.suitabilityIrrigated"
        layerKey="suitabilityIrrigated"
        label="Irrigated Area (Ha)"
      >
        <template #legend>
          <div class="mt-1 space-y-0.5">
            <p class="text-xs text-[#2c2c2c] font-semibold mb-1 ml-6">
              Rice Mechanization
            </p>
            <!-- Eye icon rows matching GeoPortal page 10 -->
            <div
              class="flex items-center gap-2 text-base text-[#2c2c2c] px-2 py-0.5"
            >
              <svg
                class="w-4 h-4 text-orange-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <div
                class="w-4 h-4 rounded-sm shrink-0"
                style="background: #f39c12"
              ></div>
              <span>Suitable</span>
            </div>
            <div
              class="flex items-center gap-2 text-base text-[#2c2c2c] px-2 py-0.5"
            >
              <svg
                class="w-4 h-4 text-orange-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <div
                class="w-4 h-4 rounded-sm shrink-0"
                style="background: #fdebd0"
              ></div>
              <span>Moderately Suitable</span>
            </div>
          </div>
        </template>
      </LayerItem>

      <!-- Suitability Rainfed -->
      <LayerItem
        v-if="store.layers.suitabilityRainfed"
        layerKey="suitabilityRainfed"
        label="Rainfed Area (Ha)"
      >
        <template #legend>
          <div class="mt-1 space-y-0.5">
            <p class="text-xs text-[#2c2c2c] font-semibold mb-1 ml-6">
              Rice Mechanization
            </p>
            <div
              class="flex items-center gap-2 text-base text-[#2c2c2c] px-2 py-0.5"
            >
              <svg
                class="w-4 h-4 text-orange-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <div
                class="w-4 h-4 rounded-sm shrink-0"
                style="background: #f39c12"
              ></div>
              <span>Suitable</span>
            </div>
            <div
              class="flex items-center gap-2 text-base text-[#2c2c2c] px-2 py-0.5"
            >
              <svg
                class="w-4 h-4 text-orange-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <div
                class="w-4 h-4 rounded-sm shrink-0"
                style="background: #fdebd0"
              ></div>
              <span>Moderately Suitable</span>
            </div>
          </div>
        </template>
      </LayerItem>

      <!-- Slope Class -->
      <LayerItem
        v-if="store.layers.slopeClass"
        layerKey="slopeClass"
        label="Slope Class"
      >
        <template #legend>
          <div class="ml-6 mt-4 space-y-1">
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #90ee90"></div>
              Flat (0%-3%)
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #27ae60"></div>
              Gently Undulating (3%-8%)
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #f1c40f"></div>
              Undulating (8%-20%)
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #f39c12"></div>
              Strongly Undulating (20%-45%)
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #e74c3c"></div>
              Mountainous (45%-75%)
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #8b0000"></div>
              Steep (>75%)
            </div>
          </div>
        </template>
      </LayerItem>

      <!-- Suitable Slope -->
      <LayerItem
        v-if="store.layers.suitableSlope"
        layerKey="suitableSlope"
        label="Suitable Slope"
      >
        <template #legend>
          <div class="ml-6 mt-4 space-y-1">
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #27ae60"></div>
              0% - 8%
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #f1c40f"></div>
              8% - 20%
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #e74c3c"></div>
              20% - 45%
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #8b0000"></div>
              > 45%
            </div>
          </div>
        </template>
      </LayerItem>

      <!-- Soil Texture Class -->
      <LayerItem
        v-if="store.layers.soilTextureClass"
        layerKey="soilTextureClass"
        label="Soil Texture Class"
      >
        <template #legend>
          <div class="ml-6 mt-4 space-y-1">
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #e07060"></div>
              Clay
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #f1c40f"></div>
              Fine Sand
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #f5eed0"></div>
              Fine Sandy Loam
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #a0937d"></div>
              Silt Loam
            </div>
          </div>
        </template>
      </LayerItem>

      <!-- Suitable Soil Texture -->
      <LayerItem
        v-if="store.layers.suitableSoilTexture"
        layerKey="suitableSoilTexture"
        label="Suitable Soil Texture"
      >
        <template #legend>
          <div class="ml-6 mt-4 space-y-1">
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #f39c12"></div>
              Medium to Clayey
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #fdebd0"></div>
              Sandy or Very Clayey
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #e74c3c"></div>
              Silty Texture
            </div>
          </div>
        </template>
      </LayerItem>
    </template>

    <!-- Mechanization Module Layers -->
    <template v-if="store.activeModule === 'mechanization'">
      <LayerItem
        v-if="store.layers.mechanizationLevel"
        layerKey="mechanizationLevel"
        label="Mechanization Level (hp/ha)"
      >
        <template #legend>
          <div class="ml-6 mt-4 space-y-1">
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #fdebd0"></div>
              Low (0.1 to 0.9)
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #f39c12"></div>
              Moderate (0.9 to 3.0)
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #e74c3c"></div>
              High (3.0 to 5.5)
            </div>
          </div>
        </template>
      </LayerItem>

      <LayerItem
        v-if="store.layers.horsepower"
        layerKey="horsepower"
        label="Machine Availability"
      >
        <template #legend>
          <div class="ml-6 mt-4 space-y-1">
            <p class="text-xs text-[#2c2c2c] font-medium">
              Effective Horsepower (hp)
            </p>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #fdebd0"></div>
              0 to 67
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #f39c12"></div>
              67 to 185
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #e74c3c"></div>
              185 to 282
            </div>
          </div>
        </template>
      </LayerItem>

      <LayerItem
        v-if="store.layers.lguServiceArea"
        layerKey="lguServiceArea"
        label="LGU Service Area (ha)"
      >
        <template #legend>
          <div class="ml-6 mt-4 space-y-1">
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #fdebd0"></div>
              2 to 54
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #f39c12"></div>
              54 to 185
            </div>
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #e74c3c"></div>
              185 to 365
            </div>
          </div>
        </template>
      </LayerItem>
    </template>

    <!-- Sufficiency Module Layers -->
    <template v-if="store.activeModule === 'sufficiency'">
      <LayerItem
        v-if="store.layers.machineRecommendation"
        layerKey="machineRecommendation"
        label="Machine Recommendation"
      >
        <template #legend>
          <div class="ml-6 mt-4 space-y-1">
            <div class="flex items-center gap-2 text-base text-[#2c2c2c]">
              <div class="w-3 h-3 rounded-sm" style="background: #f1c40f"></div>
              Selected Barangay
            </div>
          </div>
        </template>
      </LayerItem>
    </template>
  </div>
</template>

<script setup>
import { useDSSStore } from "@/stores/dss";
import LayerItem from "./LayerItem.vue";
const store = useDSSStore();
</script>
