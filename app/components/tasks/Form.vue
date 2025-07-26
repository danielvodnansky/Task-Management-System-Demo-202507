<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label
        class="block text-sm font-medium text-gray-700"
        for="title"
      >Title</label>
      <input
        id="title"
        ref="firstInputRef"
        v-model="formData.title"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        type="text"
      >
      <p
        v-if="errors.title"
        class="text-red-500 text-xs mt-1"
      >
        {{ errors.title }}
      </p>
    </div>

    <div class="mb-4">
      <label
        class="block text-sm font-medium text-gray-700"
        for="description"
      >Description (Optional)</label>
      <textarea
        id="description"
        v-model="formData.description"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        rows="3"
      />
      <p
        v-if="errors.description"
        class="text-red-500 text-xs mt-1"
      >
        {{ errors.description }}
      </p>
    </div>

    <div class="mb-4">
      <label
        class="block text-sm font-medium text-gray-700"
        for="dueDate"
      >Due Date</label>
      <input
        id="dueDate"
        v-model="formData.dueDate"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        type="date"
        :min="new Date().toISOString().split('T')[0]"
      >
      <p
        v-if="errors.dueDate"
        class="text-red-500 text-xs mt-1"
      >
        {{ errors.dueDate }}
      </p>
    </div>

    <div class="mb-4">
      <label
        class="block text-sm font-medium text-gray-700"
        for="priority"
      >Priority</label>
      <select
        id="priority"
        v-model="formData.priority"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="low">
          Low
        </option>
        <option value="medium">
          Medium
        </option>
        <option value="high">
          High
        </option>
      </select>
      <p
        v-if="errors.priority"
        class="text-red-500 text-xs mt-1"
      >
        {{ errors.priority }}
      </p>
    </div>

    <div class="mb-4">
      <label
        class="block text-sm font-medium text-gray-700"
        for="projectId"
      >Project</label>
      <select
        id="projectId"
        v-model="formData.projectId"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option
          disabled
          value=""
        >
          Select a project
        </option>
        <option
          v-for="project in projectStore.allProjects"
          :key="project.id"
          :value="project.id"
        >
          {{ project.name }}
        </option>
      </select>
      <p
        v-if="errors.projectId"
        class="text-red-500 text-xs mt-1"
      >
        {{ errors.projectId }}
      </p>
    </div>

    <div class="flex justify-end space-x-2 mt-6">
      <button
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
        type="button"
        @click="emit('cancel')"
      >
        Cancel
      </button>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        type="submit"
      >
        {{ isEditing ? 'Update Task' : 'Add Task' }}
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, computed, watch, ref, onMounted, type PropType } from 'vue'
import { z } from 'zod'
import { format } from 'date-fns'
import { useProjectStore } from '~/store/projects'
import type { Task } from '~/types/Task'
import { TaskFormSchema, type TaskForm } from '~/types/TaskForm'

const props = defineProps({
  task: {
    type: Object as PropType<Task | null>,
    default: null,
  },
})

const emit = defineEmits([
  'submit',
  'cancel',
])

const projectStore = useProjectStore()
const firstInputRef = ref<HTMLInputElement | null>(null)
const formData = reactive<TaskForm>({
  uuid: props.task?.uuid,
  title: props.task?.title || '',
  description: props.task?.description || '',
  dueDate: props.task?.dueDate ? format(new Date(props.task.dueDate), 'yyyy-MM-dd') : '',
  priority: props.task?.priority || 'medium',
  projectId: props.task?.projectId || (projectStore.allProjects.length > 0 ? projectStore?.allProjects?.[0]?.id : '') || '',
  completed: props.task?.completed || false,
})
const errors = reactive<Record<keyof TaskForm, string>>({} as Record<keyof TaskForm, string>)
const isEditing = computed(() => !!props.task)
watch(() => props.task, (newTask) => {
  formData.uuid = newTask?.uuid
  formData.title = newTask?.title || ''
  formData.description = newTask?.description || ''
  formData.dueDate = newTask?.dueDate ? format(new Date(newTask.dueDate), 'yyyy-MM-dd') : ''
  formData.priority = newTask?.priority || 'medium'
  formData.projectId = newTask?.projectId || (projectStore.allProjects.length > 0 ? projectStore?.allProjects?.[0]?.id : '') || ''
  formData.completed = newTask?.completed || false
  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      errors[key as keyof TaskForm] = ''
    }
  }
}, { deep: true })
onMounted(() => {
  firstInputRef.value?.focus();
});
const handleSubmit = () => {
  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      errors[key as keyof TaskForm] = ''
    }
  }

  try {
    const validatedData = TaskFormSchema.parse(formData)
    emit('submit', validatedData)  } catch (e) {
    if (e instanceof z.ZodError) {
      e.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          errors[issue.path[0] as keyof TaskForm] = issue.message
        }
      })
    } else {
      console.error('An unexpected error occurred during form validation:', e)
    }
  }
}
</script>

<style scoped>

</style>
