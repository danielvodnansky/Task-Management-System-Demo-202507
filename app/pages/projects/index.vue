<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">
        Your Projects
      </h1>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
        @click="openAddProjectModal"
      >
        Add New Project
      </button>
    </div>

    <div
      v-if="projectStore.allProjects.length === 0"
      class="text-center text-gray-500 py-8"
    >
      No projects found. Start by adding a new one!
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProjectsProjectCard
        v-for="project in projectStore.allProjects"
        :key="project.id"
        :project="project"
        :color="getProjectColor(project.id)"
      />
    </div>

    <!-- Project Add/Edit Modal -->
    <CommonModal
      :is-open="isProjectModalOpen"
      @close="closeProjectModal"
    >
      <template #header>
        {{ editingProject ? 'Edit Project' : 'Add New Project' }}
      </template>
      <ProjectsProjectForm
        :project="editingProject"
        @cancel="closeProjectModal"
        @submit="handleProjectFormSubmit"
      />
    </CommonModal>
  </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from '~/store/projects'
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 for new project IDs

const projectStore = useProjectStore()
const { isProjectModalOpen, editingProject, openAddProjectModal, closeProjectModal, handleProjectFormSubmit } = useProjectFormModal()

// Simple color mapping for demonstration, you might want a more robust system
const projectColors: { [key: string]: string } = {
  '1': '#60A5FA', // blue-400
  '2': '#34D399', // green-400
  '3': '#A78BFA', // purple-400
  // Add more as needed, or generate dynamically
}

const getProjectColor = (projectId: string) => {
  return projectColors[projectId] || '#9CA3AF' // Default to gray-400
}
</script>

<style scoped>
/* Scoped styles for the projects page */
</style>
