<template>
  <div class="w-full md:w-auto relative">
    <label
      class="block text-sm font-medium text-gray-700 mb-1"
      for="projectFilter"
    >Project:</label>
    <div class="flex items-center">
      <input
        id="projectFilter"
        v-model="searchTerm"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-l-md"
        placeholder="Search projects..."
        type="text"
        @blur="closeDropdown"
        @focus="isDropdownOpen = true"
      >
      <button
        v-if="taskStore.selectedProjectId !== undefined"
        class="mt-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition-colors duration-200 text-sm"
        title="Clear Project Filter"
        @click="clearProjectFilter"
      >
        Clear
      </button>
    </div>

    <div
      v-if="isDropdownOpen && filteredProjects.length > 0"
      class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
    >
      <ul
        aria-labelledby="projectFilter"
        role="listbox"
      >
        <li
          v-for="project in filteredProjects"
          :key="project.id"
          class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100 hover:text-blue-900"
          :class="{ 'bg-blue-50 text-blue-900': project.id === taskStore.selectedProjectId }"
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
      class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-2 px-3 text-sm text-gray-500"
    >
      No projects found.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useProjectStore } from '~/store/projects'
import { useTaskStore } from '~/store/tasks' // Import the task store
import type { Project } from '~/types/Project'

const projectStore = useProjectStore()
const taskStore = useTaskStore() // Access the task store

const projects = computed(() => projectStore.allProjects)

const searchTerm = ref<string>('')
const isDropdownOpen = ref<boolean>(false)

// Filter projects based on the search term
const filteredProjects = computed(() => {
  if (!searchTerm.value) {
    return projects.value // If no search term, show all projects
  }
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return projects.value.filter((project: Project) =>
    project.name.toLowerCase().includes(lowerCaseSearchTerm), // Case-insensitive search
  )
})

// Initialize searchTerm based on the current selectedProjectId from the store
onMounted(() => {
  if (taskStore.selectedProjectId !== undefined) {
    const initialProject = projectStore.getProjectById(taskStore.selectedProjectId)
    if (initialProject) {
      searchTerm.value = initialProject.name
    }
  }
})

// Watch for changes in the store's selectedProjectId and update searchTerm
// This ensures reactivity when localStorage loads or other parts of the app change the filter
watch(() => taskStore.selectedProjectId, (newId) => {
  if (newId !== undefined) {
    const project = projectStore.getProjectById(newId)
    if (project) {
      searchTerm.value = project.name
    }
  } else {
    searchTerm.value = '' // Clear search term if project filter is cleared in store
  }
}, { immediate: true }); // Immediate ensures it runs on mount as well

// Function to handle project selection from the dropdown
const selectProject = (project: Project) => {
  taskStore.setProjectId(project.id) // Update store directly
  searchTerm.value = project.name // Update search input with selected project name
  isDropdownOpen.value = false // Close the dropdown
}

// Function to clear the project filter
const clearProjectFilter = () => {
  taskStore.setProjectId(undefined) // Clear project filter in store
  searchTerm.value = '' // Clear search term
  isDropdownOpen.value = false
}

// Function to handle closing the dropdown when focus leaves the input
const closeDropdown = () => {
  // Delay closing to allow mousedown.prevent on list items to fire before blur
  setTimeout(() => {
    isDropdownOpen.value = false
    // If a project was selected in the store, ensure the search term matches its name.
    // If no project is selected but there's a search term, clear it.
    if (taskStore.selectedProjectId !== undefined) {
      const currentProject = projectStore.getProjectById(taskStore.selectedProjectId)
      if (currentProject && currentProject.name !== searchTerm.value) {
        searchTerm.value = currentProject.name
      } else if (!currentProject) {
        searchTerm.value = ''
        taskStore.setProjectId(undefined) // Clear if selected project no longer exists
      }
    } else if (searchTerm.value && filteredProjects.value.length === 0) {
      searchTerm.value = ''
    }
  }, 100)
}

// Clear selected project in store if search term is cleared manually
watch(searchTerm, (newTerm) => {
  if (!newTerm && taskStore.selectedProjectId !== undefined) {
    // Only clear selectedProjectId if the search term is empty and a project was previously selected
    taskStore.setProjectId(undefined)
  }
})
</script>

<style scoped>
/* Scoped styles if any */
</style>
