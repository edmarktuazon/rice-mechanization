<script setup>
import DSSLogo from "../assets/dss-logo.png";
import CompassLogo from "../assets/compass-logo.png";
</script>

<template>
  <header class="dss-header p-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <img
          :src="DSSLogo"
          alt="DSS Logo"
          class="h-16 w-auto object-cover hidden xl:block"
        />
        <div>
          <h1
            class="font-heading font-bold text-white uppercase text-2xl xl:text-5xl"
          >
            Basis for Rice Mechanization Selection, Allocation, and Distribution
            <br class="hidden lg:block" />
            in Dinalupihan, Bataan
          </h1>
        </div>
      </div>

      <div class="h-24 w-24 hidden xl:block">
        <img :src="CompassLogo" alt="Compass Logo" />
      </div>
    </div>
  </header>
</template>
