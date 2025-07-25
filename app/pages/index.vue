<template>
  <div class="container mx-auto p-4">
    <!-- Using the consistently named TaskHeader component -->
    <TasksTaskHeader />
    <!-- Filter and sort components directly interact with the store, no events needed here -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <TasksFiltersAndSort />
      <TasksProjectFilter />
    </div>
    <TasksList
      :tasks="filteredAndSortedTasks"
      @delete-task="handleDeleteTask"
      @edit-task="handleEditTask"
      @toggle-completion="handleToggleCompletion"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTaskStore } from '~/store/tasks'

// Access the task store
const taskStore = useTaskStore()

// Computed property to get filtered and sorted tasks directly from the store's getter.
// The getter now internally uses the centralized filter and sort states.
const filteredAndSortedTasks = computed(() => {
  return taskStore.getFilteredAndSortedTasks
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
  // Use a custom confirmation modal later instead of native confirm()
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(uuid)
  }
}
</script>

<style scoped>
/* Scoped styles for the page, if any */
</style>
