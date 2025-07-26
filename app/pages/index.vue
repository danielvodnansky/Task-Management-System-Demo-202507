<template>
  <div class="">
    <TasksHeader />
    <div class="flex flex-wrap flex-col md:flex-row gap-4 mb-6">
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

const taskStore = useTaskStore()
const { isModalOpen, editingTask, closeTaskModal, handleTaskFormSubmit } = useTaskFormModal()

onMounted(() => {
  taskStore.setProjectId(undefined)
})
</script>
