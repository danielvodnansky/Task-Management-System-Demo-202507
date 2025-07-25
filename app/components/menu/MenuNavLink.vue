<template>
  <NuxtLink
    class="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-colors duration-200"
    :to="to"
  >
    <BaseIcon
      v-if="iconName"
      :name="iconName"
    />
    <slot />
    {{ label }}
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import BaseIcon from '../icons/BaseIcon.vue' // Import the new BaseIcon component

// Define the props for the NavLink component
defineProps({
  // The route path the link navigates to
  to: {
    type: String as PropType<string>,
    required: true,
  },
  // The display text for the link
  label: {
    type: String as PropType<string>,
    required: true,
  },
  // Optional: The name of the icon to display (e.g., 'Home', 'Project')
  iconName: {
    type: String as PropType<string>,
    default: '',
  },
})
</script>

<style scoped>
/* Scoped styles for this component, if any, but Tailwind is preferred */
</style>
