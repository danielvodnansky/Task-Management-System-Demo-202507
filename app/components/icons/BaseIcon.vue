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

<style scoped>

</style>
