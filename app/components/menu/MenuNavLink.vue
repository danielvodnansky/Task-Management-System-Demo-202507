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

defineProps({
  to: {
    type: String as PropType<string>,
    required: true,
  },
  label: {
    type: String as PropType<string>,
    required: true,
  },
  iconName: {
    type: String as PropType<string>,
    default: '',
  },
})
</script>

<style scoped>

</style>
