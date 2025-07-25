<template>
  <div class="w-full md:w-auto relative p-4">
    <label
      class="block text-sm font-medium text-gray-700 mb-1"
      for="projectFilter"
    >
      Filter by Project:
    </label>
    <input
      id="projectFilter"
      v-model="searchTerm"
      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      placeholder="Search projects..."
      type="text"
      @blur="closeDropdown"
      @focus="isDropdownOpen = true"
    >
    <!-- Hidden input to hold the actual selected ID, useful for form submissions if this were part of a larger form -->
    <input
      type="hidden"
      :value="selectedProjectId"
    >

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
          :class="{ 'bg-blue-50 text-blue-900': project.id === selectedProjectId }"
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
import { ref, computed, watch, onMounted, type PropType } from 'vue'
import { useProjectStore } from '~/store/projects' // Import the project store
import type { Project } from '~/types/Project' // Import the Project type

const projectStore = useProjectStore()
const projects = computed(() => projectStore.allProjects) // Get all projects from the store

const searchTerm = ref<string>('') // Reactive state for the search input
const selectedProjectId = ref<number | undefined>(undefined) // Reactive state for the selected project ID
const isDropdownOpen = ref<boolean>(false) // Controls the visibility of the dropdown

const emit = defineEmits(['update:projectId']) // Emit event when project ID changes

// Define props for initial value (optional, but good for reusability)
const props = defineProps({
  initialProjectId: {
    type: Number as PropType<number | undefined>,
    default: undefined,
  },
})

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

// Set initial selected project if prop is provided
onMounted(() => {
  if (props.initialProjectId !== undefined) {
    selectedProjectId.value = props.initialProjectId
    const initialProject = projectStore.getProjectById(props.initialProjectId)
    if (initialProject) {
      searchTerm.value = initialProject.name // Set search term to initial project name
    }
  }
})

// Watch for changes in selectedProjectId and emit the update event
watch(selectedProjectId, (newId) => {
  emit('update:projectId', newId)
})

// Function to handle project selection from the dropdown
const selectProject = (project: Project) => {
  selectedProjectId.value = project.id
  searchTerm.value = project.name // Update search input with selected project name
  isDropdownOpen.value = false // Close the dropdown
}

// Function to handle closing the dropdown when focus leaves the input
const closeDropdown = () => {
  // Delay closing to allow mousedown.prevent on list items to fire before blur
  setTimeout(() => {
    isDropdownOpen.value = false
    // If a project was selected, ensure the search term matches its name.
    // If no project is selected but there's a search term, clear it.
    if (selectedProjectId.value !== undefined) {
      const currentProject = projectStore.getProjectById(selectedProjectId.value)
      if (currentProject && currentProject.name !== searchTerm.value) {
        searchTerm.value = currentProject.name
      } else if (!currentProject) {
        searchTerm.value = ''
        selectedProjectId.value = undefined
      }
    } else if (searchTerm.value && filteredProjects.value.length === 0) {
      // If user typed something but no match, clear it
      searchTerm.value = ''
    }
  }, 100)
}

// Clear selected project if search term is cleared manually
watch(searchTerm, (newTerm) => {
  if (!newTerm) {
    selectedProjectId.value = undefined
  }
})
</script>

<style scoped>
/* Scoped styles if any */
</style>
