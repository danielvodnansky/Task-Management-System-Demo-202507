<template>
  <NuxtLink
    class="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 ease-in-out"
    :to="`/projects/${project.id}`"
  >
    <div class="flex items-center mb-4">
      <span
        class="w-3 h-3 rounded-full mr-3"
        :style="{ 'background-color': color }"
      />
      <h3 class="text-xl font-semibold text-gray-800">
        {{ project.name }}
      </h3>
    </div>
    <p class="text-sm text-gray-600 mb-4">
      Total Tasks: {{ totalTasks }}
    </p>
    <div class="flex justify-end space-x-2">
      <button
        class="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors duration-200"
        title="Edit Project"
        @click.prevent="openEditProjectModal(project.id)"
      >
        <IconsBaseIcon name="edit" />
      </button>
      <button
        class="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors duration-200"
        title="Delete Project"
        @click.prevent="confirmDeleteProject(project.id)"
      >
        <IconsBaseIcon name="delete" />
      </button>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import type { Project } from '~/types/Project'
import { useTaskStore } from '~/store/tasks'
import { useProjectStore } from '~/store/projects'

const props = defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
  color: {
    type: String as PropType<string>,
    default: 'gray',
  },
})

const taskStore = useTaskStore()
const projectStore = useProjectStore()
const { openEditProjectModal } = useProjectFormModal()
const totalTasks = computed(() => taskStore.getTasksByProjectId(props.project.id).length)

const confirmDeleteProject = (id: string) => {
  if (confirm(`Are you sure you want to delete project "${props.project.name}" and all its tasks?`)) {
    projectStore.deleteProject(id)
    taskStore.deleteTasksByProjectId(id)
  }
}
</script>

<style scoped>

</style>
