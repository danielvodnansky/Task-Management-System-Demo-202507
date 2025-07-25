import { ref } from 'vue'
import { useTaskStore } from '~/store/tasks'
import type { Task } from '~/types/Task'
import type { TaskForm } from '~/types/TaskForm'

const isModalOpen = ref(false)
const editingTask = ref<Task | null>(null)
export function useTaskFormModal () {
  const taskStore = useTaskStore()

  /**
   * Opens the modal for adding a new task.
   */
  const openAddTaskModal = () => {
    editingTask.value = null
    isModalOpen.value = true
  }

  /**
   * Opens the modal for editing an existing task.
   * @param uuid The UUID of the task to edit.
   */
  const openEditTaskModal = (uuid: string) => {
    const taskToEdit = taskStore.allTasks.find((task: Task) => task.uuid === uuid)
    if (taskToEdit) {
      editingTask.value = taskToEdit
      isModalOpen.value = true
    } else {
      console.warn(`Task with UUID ${uuid} not found for editing.`)
    }
  }

  /**
   * Closes the modal and resets the editing task state.
   */
  const closeTaskModal = () => {
    isModalOpen.value = false
    editingTask.value = null
  }

  /**
   * Handles the submission of the task form (add or edit).
   * @param formData The validated form data.
   */
  const handleTaskFormSubmit = (formData: TaskForm) => {
    if (editingTask.value) {
      taskStore.editTask({ ...editingTask.value, ...formData })
    } else {
      const newTaskData = {
        ...formData,
        projectId: formData.projectId,
      }
      taskStore.addTask(newTaskData as Omit<Task, 'uuid' | 'completed'>)
    }
    closeTaskModal()
  }

  return {
    isModalOpen,
    editingTask,
    openAddTaskModal,
    openEditTaskModal,
    closeTaskModal,
    handleTaskFormSubmit,
  }
}
