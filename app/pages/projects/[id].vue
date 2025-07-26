<template>
  <div class="">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">
        Tasks for Project: {{ currentProjectName }}
      </h1>
      <!-- Button to add new task for this project -->
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
        @click="openAddTaskModal"
      >
        Add New Task
      </button>
    </div>

    <!-- Filter and sort components directly interact with the store -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <TasksFiltersAndSort />
      <!-- ProjectFilter is not needed here as the project is already defined by the route -->
    </div>
    <TasksList :project-id="route.params.id" />

    <!-- Task Add/Edit Modal (controlled by composable) -->
    <CommonModal
      :is-open="isModalOpen"
      @close="closeTaskModal"
    >
      <template #header>
        {{ editingTask ? 'Edit Task' : 'Add New Task' }}
      </template>
      <TasksForm
        :task="editingTask"
        @cancel="closeTaskModal"
        @submit="handleTaskFormSubmit"
      />
    </CommonModal>
  </div>
</template>

<script lang="ts" setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '~/store/projects'
import { useTaskStore } from '~/store/tasks'
import { useTaskFormModal } from '~/composables/useTaskFormModal'

const route = useRoute()
const taskStore = useTaskStore()
const projectStore = useProjectStore()
const { isModalOpen, editingTask, openAddTaskModal, closeTaskModal, handleTaskFormSubmit } = useTaskFormModal()

// Watch for changes in the route params and update the task store's selectedProjectId
watchEffect(() => {
  const projectIdParam = route.params.id
  if (projectIdParam) {
    taskStore.setProjectId(Array.isArray(projectIdParam) ? projectIdParam[0] : projectIdParam)
  } else {
    taskStore.setProjectId(undefined)
  }
})

// Computed property to display the current project name in the header
const currentProjectName = computed(() => {
  const projectId = taskStore.selectedProjectId
  if (projectId !== undefined) {
    const project = projectStore.getProjectById(projectId)
    return project ? project.name : 'Unknown Project'
  }
  return 'All Tasks' // Fallback for safety, though this page should always have a project ID
})

// No need for local computed `filteredAndSortedTasks` or event handlers for task actions
// as `TasksList` and `TasksCard` now directly interact with the store/composable.
</script>

<style scoped>
/* Scoped styles for the page, if any */
</style>
