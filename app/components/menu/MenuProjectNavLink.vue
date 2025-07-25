<template>
  <MenuNavLink
    :label="projectName"
    :to="to"
  >
    <span
      :class="['w-2 h-2 rounded-full mr-3']"
      :style="{ 'background-color': color }"
    />
  </MenuNavLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  to: {
    type: String as PropType<string>,
    required: true,
  },
  projectName: {
    type: String as PropType<string>,
    required: true,
  },
  color: {
    type: String as PropType<string>,
    default: 'gray',
  },
})
</script>
