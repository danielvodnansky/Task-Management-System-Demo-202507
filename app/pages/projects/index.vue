<template>
  <div>
    <LazyProjectsHeader />
    <LazyProjectsList />

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

useHead({
  title: 'Your Projects - Task Management System',
})

useProjectStore()
const { isProjectModalOpen, editingProject, closeProjectModal, handleProjectFormSubmit } = useProjectFormModal()
</script>

<style scoped>

</style>
