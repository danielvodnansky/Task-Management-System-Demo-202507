<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">
        Tasks for Project: {{ currentProjectName }}
      </h1>
      <!-- Placeholder for an "Add Task" button, functionality to be added later -->
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
      >
        Add New Task
      </button>
    </div>

    <!-- Filter and sort components directly interact with the store -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <TasksFiltersAndSort />
      <!-- ProjectFilter is not needed here as the project is already defined by the route -->
    </div>

    <TasksTaskList
      :tasks="filteredAndSortedTasks"
      @delete-task="handleDeleteTask"
      @edit-task="handleEditTask"
      @toggle-completion="handleToggleCompletion"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '~/store/tasks'
import { useProjectStore } from '~/store/projects'

const route = useRoute()
const taskStore = useTaskStore()
const projectStore = useProjectStore()

// Watch for changes in the route params and update the task store's selectedProjectId
watchEffect(() => {
  const projectIdParam = route.params.id
  if (projectIdParam) {
    const id = parseInt(Array.isArray(projectIdParam) ? projectIdParam[0] : projectIdParam)
    if (!isNaN(id)) {
      taskStore.setProjectId(id)
    } else {
      // Handle invalid project ID in URL, e.g., redirect to /projects or /
      console.warn('Invalid project ID in URL:', projectIdParam)
      taskStore.setProjectId(undefined) // Clear filter if ID is invalid
    }
  } else {
    taskStore.setProjectId(undefined) // Clear project filter if no ID in route (shouldn't happen on this page)
  }
})

// Computed property to get filtered and sorted tasks directly from the store's getter.
const filteredAndSortedTasks = computed(() => {
  return taskStore.getFilteredAndSortedTasks
})

// Computed property to display the current project name in the header
const currentProjectName = computed(() => {
  const projectId = taskStore.selectedProjectId
  if (projectId !== undefined) {
    const project = projectStore.getProjectById(projectId)
    return project ? project.name : 'Unknown Project'
  }
  return 'All Tasks' // Fallback, though this page should always have a project ID
})

// Handlers for task actions (these remain in the page as they trigger store actions)
const handleToggleCompletion = (uuid: string) => {
  taskStore.toggleTaskCompletion(uuid)
}

const handleEditTask = (uuid: string) => {
  console.log('Edit task:', uuid)
  // TODO: Implement navigation to a task edit form/modal
}

const handleDeleteTask = (uuid: string) => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(uuid)
  }
}
</script>
