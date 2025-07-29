<template>
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
      Your Projects
    </h1>
    <button
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
      @click="openAddProjectModal"
    >
      Add New Project
    </button>
  </div>
</template>

<script lang="ts" setup>
const { openAddProjectModal } = useProjectFormModal()
</script>
