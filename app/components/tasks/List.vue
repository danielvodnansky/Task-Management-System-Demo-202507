<template>
  <div class="space-y-4">
    <div
      v-if="tasks.length === 0"
      class="text-center text-gray-500 py-8"
    >
      No tasks found.
    </div>
    <!-- Use TransitionGroup for list animations -->
    <TransitionGroup
      name="list"
      tag="div"
    >
      <TasksCard
        v-for="(task, index) in tasks"
        :key="task.uuid ?? index"
        class="mt-4"
        :task="task"
      />
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTaskStore } from '~/store/tasks'
import TasksCard from './Card.vue' // Ensure correct import path for TaskCard

const taskStore = useTaskStore()

const props = defineProps({
  // Optional projectId prop to immediately filter tasks
  projectId: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
})

// Directly get the filtered and sorted tasks from the store
const tasks = computed(() => {
  const currentProjectId = props.projectId !== undefined ? props.projectId : taskStore.selectedProjectId
  taskStore.setProjectId(currentProjectId)

  return taskStore.getFilteredAndSortedTasks
})

// No emits needed here as TaskCard handles toggle/delete/edit directly with the store/composable
</script>
