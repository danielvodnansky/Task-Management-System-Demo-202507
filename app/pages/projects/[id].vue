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
    <TasksList :project-id="routeProjectId" />

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
watchEffect(() => {
  const projectIdParam = route.params.id
  if (projectIdParam) {
    taskStore.setProjectId(Array.isArray(projectIdParam) ? projectIdParam[0] : projectIdParam)
  } else {
    taskStore.setProjectId(undefined)
  }
})

const routeProjectId = computed(() => {
  return Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
})
const currentProjectName = computed(() => {
  const projectId = routeProjectId
  if (projectId.value !== undefined) {
    const project = projectStore.getProjectById(projectId.value)
    return project ? project.name : 'Unknown Project'
  }
  return 'All Tasks'
})

useHead({
  title: computed(() => `${currentProjectName.value} - Task Management System`),
})
</script>

<style scoped>

</style>
