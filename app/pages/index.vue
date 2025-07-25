<template>
  <div class="container mx-auto p-4">
    <TasksHeader />
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <TasksFiltersAndSort />
      <TasksProjectFilter />
    </div>
    <TasksList />

    <!-- Task Add/Edit Modal (controlled by composable) -->
    <CommonModal
      :is-open="isModalOpen"
      @close="closeTaskModal"
    >
      <template #header>
        {{ editingTask ? 'Edit Task' : 'Add New Task' }}
      </template>
      <TasksForm
        :task="editingTask"
        @cancel="closeTaskModal"
        @submit="handleTaskFormSubmit"
      />
    </CommonModal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useTaskStore } from '~/store/tasks'
import { useTaskFormModal } from '~/composables/useTaskFormModal'

// Access the task store and the task form modal composable
const taskStore = useTaskStore()
const { isModalOpen, editingTask, closeTaskModal, handleTaskFormSubmit } = useTaskFormModal()

// On component mount, ensure the project filter is cleared for the "All Tasks" page
onMounted(() => {
  taskStore.setProjectId(undefined)
})

// No need for local computed `filteredAndSortedTasks` or event handlers for task actions
// as `TasksList` and `TasksCard` now directly interact with the store/composable.
</script>

<style scoped>
/* Scoped styles for the page, if any */
</style>
