<template>
  <!-- Use an img tag to load the SVG from the public directory -->
  <img
    :alt="`${name} icon`"
    class=" base-icon w-5 h-5 mr-3"
    :class="svgClasses"
    loading="lazy"
    :src="iconPath"
  >
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'

const props = defineProps({
  // The name of the icon (e.g., 'home', 'project') which corresponds to the SVG filename
  name: {
    type: String as PropType<string>,
    required: true,
  },
  // Optional classes to apply to the img tag (e.g., for sizing or color)
  svgClasses: {
    type: String as PropType<string>,
    default: '',
  },
})

// Computed property to construct the full path to the SVG asset
const iconPath = computed(() => `/icons/${props.name.toLowerCase()}.svg`)
</script>

<style scoped>
/* No specific styles needed here, as styling is handled by Tailwind classes */
</style>
