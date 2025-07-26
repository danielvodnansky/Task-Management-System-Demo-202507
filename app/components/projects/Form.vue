<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label
        class="block text-sm font-medium text-gray-700"
        for="projectName"
      >
        Project Name
      </label>
      <input
        id="projectName"
        ref="firstInputRef"
        v-model="formData.name"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        type="text"
      >
      <p
        v-if="errors.name"
        class="text-red-500 text-xs mt-1"
      >
        {{ errors.name }}
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
        {{ isEditing ? 'Update Project' : 'Add Project' }}
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, computed, watch, type PropType } from 'vue'
import { z } from 'zod'
import type { Project } from '~/types/Project'
import { ProjectFormSchema, type ProjectForm } from '~/types/ProjectForm'

const props = defineProps({
  project: {
    type: Object as PropType<Project | null>,
    default: null,
  },
})

const emit = defineEmits([
  'submit',
  'cancel',
])

const firstInputRef = ref<HTMLInputElement | null>(null)

const formData = reactive<ProjectForm>({
  id: props.project?.id,
  name: props.project?.name || '',
})

const errors = reactive<Record<keyof ProjectForm, string>>({} as Record<keyof ProjectForm, string>)

const isEditing = computed(() => !!props.project)

watch(() => props.project, (newProject) => {
  formData.id = newProject?.id
  formData.name = newProject?.name || ''
  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      errors[key as keyof ProjectForm] = ''
    }
  }
}, { deep: true })

onMounted(() => {
  firstInputRef.value?.focus()
})

const handleSubmit = () => {
  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      errors[key as keyof ProjectForm] = ''
    }
  }

  try {
    const validatedData = ProjectFormSchema.parse(formData)
    emit('submit', validatedData)
  } catch (e) {
    if (e instanceof z.ZodError) {
      e.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          errors[issue.path[0] as keyof ProjectForm] = issue.message
        }
      })
    } else {
      console.error('An unexpected error occurred during form validation:', e)
    }
  }
}
</script>
