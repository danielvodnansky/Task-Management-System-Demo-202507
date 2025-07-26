import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useProjectStore } from '~/store/projects'
import type { Project } from '~/types/Project'
import type { ProjectForm } from '~/types/ProjectForm'

const isProjectModalOpen = ref(false)
const editingProject = ref<Project | null>(null)

export function useProjectFormModal () {
  const projectStore = useProjectStore()

  const openAddProjectModal = () => {
    editingProject.value = null
    isProjectModalOpen.value = true
  }

  const openEditProjectModal = (id: string) => {
    const projectToEdit = projectStore.getProjectById(id)
    if (projectToEdit) {
      editingProject.value = projectToEdit
      isProjectModalOpen.value = true
    } else {
      console.warn(`Project with ID ${id} not found for editing.`)
    }
  }

  const closeProjectModal = () => {
    isProjectModalOpen.value = false
    editingProject.value = null
  }

  const handleProjectFormSubmit = (formData: ProjectForm) => {
    if (editingProject.value) {
      projectStore.editProject({ ...editingProject.value, ...formData })
    } else {
      const newProjectData: Project = {
        id: uuidv4(), name: formData.name,
      }
      projectStore.addProject(newProjectData)
    }
    closeProjectModal()
  }

  return {
    isProjectModalOpen,
    editingProject,
    openAddProjectModal,
    openEditProjectModal,
    closeProjectModal,
    handleProjectFormSubmit,
  }
}
