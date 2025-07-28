<template>
  <div class="w-full md:w-auto relative">
    <label
      class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
      for="projectFilter"
    >Project:</label>
    <div class="flex items-center">
      <input
        id="projectFilter"
        v-model="searchTerm"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-l-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        placeholder="Search projects..."
        type="text"
        @blur="closeDropdown"
        @focus="isDropdownOpen = true"
      >
      <button
        v-if="taskStore.selectedProjectId !== undefined"
        class="mt-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
        title="Clear Project Filter"
        @click="clearProjectFilter"
      >
        Clear
      </button>
    </div>

    <div
      v-if="isDropdownOpen && filteredProjects.length > 0"
      class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm dark:bg-gray-800 dark:shadow-xl dark:ring-gray-700"
    >
      <ul
        aria-labelledby="projectFilter"
        role="listbox"
      >
        <li
          v-for="project in filteredProjects"
          :key="project.id"
          class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-100 dark:hover:bg-blue-900 dark:hover:text-blue-200"
          :class="{ 'bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-200': project.id === taskStore.selectedProjectId }"
          tabindex="0"
          @keydown.enter="selectProject(project)"
          @mousedown.prevent="selectProject(project)"
        >
          <span class="font-normal block truncate">
            {{ project.name }}
          </span>
        </li>
      </ul>
    </div>
    <div
      v-else-if="isDropdownOpen && filteredProjects.length === 0 && searchTerm.length > 0"
      class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-2 px-3 text-sm text-gray-500 dark:bg-gray-800 dark:shadow-xl dark:text-gray-400"
    >
      No projects found.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useProjectStore } from '~/store/projects'
import { useTaskStore } from '~/store/tasks'
import type { Project } from '~/types/Project'

const projectStore = useProjectStore()
const taskStore = useTaskStore()
const projects = computed(() => projectStore.allProjects)

const searchTerm = ref<string>('')
const isDropdownOpen = ref<boolean>(false)
const filteredProjects = computed(() => {
  if (!searchTerm.value) {
    return projects.value
  }
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return projects.value.filter((project: Project) =>
    project.name.toLowerCase().includes(lowerCaseSearchTerm))
})
onMounted(() => {
  if (taskStore.selectedProjectId !== undefined) {
    const initialProject = projectStore.getProjectById(taskStore.selectedProjectId)
    if (initialProject) {
      searchTerm.value = initialProject.name
    }
  }
})
watch(() => taskStore.selectedProjectId, (newId) => {
  if (newId !== undefined) {
    const project = projectStore.getProjectById(newId)
    if (project) {
      searchTerm.value = project.name
    }
  } else {
    searchTerm.value = ''
  }
}, { immediate: true })
const selectProject = (project: Project) => {
  taskStore.setProjectId(project.id)
  searchTerm.value = project.name
  isDropdownOpen.value = false
}
const clearProjectFilter = () => {
  taskStore.setProjectId(undefined)
  searchTerm.value = ''
  isDropdownOpen.value = false
}
const closeDropdown = () => {
  setTimeout(() => {
    isDropdownOpen.value = false
    if (taskStore.selectedProjectId !== undefined) {
      const currentProject = projectStore.getProjectById(taskStore.selectedProjectId)
      if (currentProject && currentProject.name !== searchTerm.value) {
        searchTerm.value = currentProject.name
      } else if (!currentProject) {
        searchTerm.value = ''
        taskStore.setProjectId(undefined)
      }
    } else if (searchTerm.value && filteredProjects.value.length === 0) {
      searchTerm.value = ''
    }
  }, 100)
}
watch(searchTerm, (newTerm) => {
  if (!newTerm && taskStore.selectedProjectId !== undefined) {
    taskStore.setProjectId(undefined)
  }
})
</script>

<style scoped>

</style>
