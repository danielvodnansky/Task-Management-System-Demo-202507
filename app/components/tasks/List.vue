<template>
  <div class="space-y-4">
    <div
      v-if="tasks.length === 0"
      class="text-center text-gray-500 py-8"
    >
      No tasks found.
    </div>
    <TasksCard
      v-for="task in tasks"
      :key="task.uuid"
      :task="task"
      @edit-task="handleEditTask"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTaskStore } from '~/store/tasks'

const taskStore = useTaskStore()

// Directly get the filtered and sorted tasks from the store
const tasks = computed(() => taskStore.getFilteredAndSortedTasks)

// The TaskList component now only needs to handle the edit-task emit
// from TaskCard if the page needs to navigate or open a modal.
// Toggle and Delete are handled directly by TaskCard with the store.
const emit = defineEmits(['edit-task'])

const handleEditTask = (uuid: string) => {
  emit('edit-task', uuid)
}
</script>

<style scoped>
/* Scoped styles if any */
</style>
