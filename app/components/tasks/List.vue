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

const tasks = computed(() => taskStore.getFilteredAndSortedTasks)

const handleEditTask = (uuid: string) => {
  console.log('Edit task:', uuid)
  // TODO: Implement navigation to a task edit form/modal
}
</script>
