<template>
  <div class="color-toggler">
    <button
      aria-label="Toggle dark mode"
      class="flex items-center justify-center w-full p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
      @click="toggleColorMode"
    >
      <IconsBaseIcon
        :name="colorMode.value === 'dark' ? 'moon' : 'sun'"
        svg-classes="w-5 h-5 mr-2"
      />
      <span>{{ colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode' }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
