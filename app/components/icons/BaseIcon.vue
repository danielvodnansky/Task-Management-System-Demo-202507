<template>
  <!-- Use an img tag to load the SVG from the public directory -->
  <img
    :alt="`${name} icon`"
    class="base-icon w-5 h-5 mx-2"
    :class="svgClasses"
    loading="lazy"
    :src="iconPath"
  >
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'

const props = defineProps({
  name: {
    type: String as PropType<string>,
    required: true,
  },
  svgClasses: {
    type: String as PropType<string>,
    default: '',
  },
})
const iconPath = computed(() => `/icons/${props.name.toLowerCase()}.svg`)
</script>

<style>
.base-icon {
  transition: all cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;
}
html.dark-mode .base-icon {
  filter: invert(1);
}
</style>
