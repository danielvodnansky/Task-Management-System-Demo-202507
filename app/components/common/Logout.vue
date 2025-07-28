<template>
  <button
    aria-label="Logout"
    class="flex items-center justify-center w-full p-2 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-red-600 dark:hover:bg-red-100 mb-2"
    @click="authStore.logout()"
  >
    <IconsBaseIcon
      name="logout"
      svg-classes="w-5 h-5 mr-2"
    />
    <span>Logout</span>
  </button>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()
</script>
