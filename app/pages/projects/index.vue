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
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProjectsCard
        v-for="project in projectStore.allProjects"
        :key="project.id"
        :color="getProjectColor(project.id)"
        :project="project"
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
      <ProjectsForm
        :project="editingProject"
        @cancel="closeProjectModal"
        @submit="handleProjectFormSubmit"
      />
    </CommonModal>
  </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from '~/store/projects'
import { getProjectColor } from '~/utils/projectColors'

useHead({
  title: 'Your Projects - Task Management System',
})

const projectStore = useProjectStore()
const { isProjectModalOpen, editingProject, openAddProjectModal, closeProjectModal, handleProjectFormSubmit } = useProjectFormModal()
</script>

<style scoped>

</style>
