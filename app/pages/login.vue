<template>
  <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm text-center">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
      Login to Task Management
    </h1>
    <p class="text-gray-600 dark:text-gray-300 mb-6">
      This is just a mock login
    </p>
    <button
      class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
      @click="authStore.login()"
    >
      Login
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'
useHead({
  title: 'Login - Task Management System',
})
definePageMeta({
  layout: 'guest',
})

const authStore = useAuthStore()
</script>
