<template>
  <div
    class="bg-white p-4 rounded-lg shadow-md flex items-center justify-between transition-all duration-200 ease-in-out"
    :class="{ 'opacity-60 line-through': task.completed }"
  >
    <div class="flex items-center flex-grow">
      <!-- Checkbox to toggle task completion -->
      <input
        :checked="task.completed"
        class="mr-4 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        type="checkbox"
        @change="taskStore.toggleTaskCompletion(task.uuid)"
      >
      <div>
        <!-- Task Title -->
        <h3 class="text-lg font-semibold text-gray-800">
          {{ task.title }}
        </h3>
        <!-- Task Description (if available) -->
        <p
          v-if="task.description"
          class="text-sm text-gray-600 mt-1"
        >
          {{ task.description }}
        </p>
        <!-- Task Details: Due Date and Priority -->
        <div class="flex items-center text-sm text-gray-500 mt-2 space-x-3">
          <span class="flex items-center">
            <IconsBaseIcon name="calendar" />
            {{ formattedDueDate }}
          </span>
          <span
            class="px-2 py-0.5 rounded-full text-xs font-medium"
            :class="priorityClass"
          >
            {{ task.priority }}
          </span>
          <span class="text-xs text-gray-500">
            Project: {{ project?.name || 'N/A' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center space-x-2 ml-4">
      <button
        class="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors duration-200"
        :disabled="task.completed"
        title="Edit Task"
        @click="openEditTaskModal(task.uuid)"
      >
        <IconsBaseIcon name="edit" />
      </button>
      <button
        class="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors duration-200"
        :disabled="task.completed"
        title="Delete Task"
        @click="confirmDeleteTask(task.uuid)"
      >
        <IconsBaseIcon name="delete" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import { useProjectStore } from '~/store/projects'
import { useTaskStore } from '~/store/tasks'
import type { Task } from '~/types/Task'
import { useTaskFormModal } from '~/composables/useTaskFormModal'

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
})

const projectStore = useProjectStore()
const taskStore = useTaskStore()
const { openEditTaskModal } = useTaskFormModal() // Use the composable

const project = computed(() => projectStore.getProjectById(props.task.projectId))

const formattedDueDate = computed(() => {
  const date = new Date(props.task.dueDate)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
})

const priorityClass = computed(() => {
  switch (props.task.priority) {
    case 'low':
      return 'bg-green-100 text-green-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'high':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

const confirmDeleteTask = (uuid: string) => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(uuid)
  }
}
</script>

<style scoped>
/* Scoped styles if any */
</style>
