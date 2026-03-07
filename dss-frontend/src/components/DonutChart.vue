<template>
  <div class="flex justify-center my-2">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <g :transform="`translate(${size / 2}, ${size / 2})`">
        <path
          v-for="(segment, i) in computedSegments"
          :key="i"
          :d="segment.path"
          :fill="segment.color"
          :opacity="segment.opacity || 1"
        />
        <!-- Center hole — drawn on top to punch through -->
        <circle :r="innerRadius" :fill="holeFill" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  segments: { type: Array, default: () => [] },
  size: { type: Number, default: 120 },
  outerRadius: { type: Number, default: 52 },
  innerRadius: { type: Number, default: 32 },
  holeFill: { type: String, default: "rgba(80,80,80,0.95)" },
});

function polarToCartesian(r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

function arcPath(startDeg, endDeg, outerR, innerR) {
  // Clamp to avoid degenerate full-circle path (start === end)
  const clampedEnd = endDeg >= 360 ? 359.9999 : endDeg;

  const large = clampedEnd - startDeg > 180 ? 1 : 0;
  const o1 = polarToCartesian(outerR, startDeg);
  const o2 = polarToCartesian(outerR, clampedEnd);
  const i1 = polarToCartesian(innerR, clampedEnd);
  const i2 = polarToCartesian(innerR, startDeg);

  return [
    `M ${o1.x} ${o1.y}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${i2.x} ${i2.y}`,
    "Z",
  ].join(" ");
}

const computedSegments = computed(() => {
  const valid = props.segments.filter((s) => s && (s.value ?? 0) > 0);
  if (!valid.length) return [];

  const total = valid.reduce((sum, s) => sum + s.value, 0);
  if (total === 0) return [];

  // Special case: single segment fills the whole donut.
  // Use two half-arcs so SVG doesn't collapse to a degenerate point.
  if (valid.length === 1) {
    const seg = valid[0];
    const half1 = arcPath(0, 180, props.outerRadius, props.innerRadius);
    const half2 = arcPath(180, 359.9999, props.outerRadius, props.innerRadius);
    return [
      { color: seg.color, opacity: seg.opacity, path: half1 },
      { color: seg.color, opacity: seg.opacity, path: half2 },
    ];
  }

  let currentAngle = 0;
  return valid.map((seg) => {
    const slice = (seg.value / total) * 360;
    const start = currentAngle;
    const end = currentAngle + slice;
    currentAngle = end;
    return {
      ...seg,
      path: arcPath(start, end, props.outerRadius, props.innerRadius),
    };
  });
});
</script>
