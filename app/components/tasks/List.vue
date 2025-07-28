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

const taskStore = useTaskStore()

const props = defineProps({
  projectId: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
})
const tasks = computed(() => {
  const currentProjectId = props.projectId !== undefined ? props.projectId : taskStore.selectedProjectId
  taskStore.setProjectId(currentProjectId)

  return taskStore.getFilteredAndSortedTasks
})
</script>
