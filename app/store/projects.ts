import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Project } from '~/types/Project'

interface ProjectState {
  projects: Project[];
}

interface ProjectGetters {
  allProjects: Project[];
  getProjectById: (id: string) => Project | undefined;
}

interface ProjectActions {
  addProject: (project: Project) => void;
  editProject: (updatedProject: Project) => void;
  deleteProject: (id: string) => void;
}

export const useProjectStore = defineStore('projects', () => {
  const projects = ref<ProjectState['projects']>([
    { id: '1', name: 'Work Tasks' },
    { id: '2', name: 'Personal Errands' },
    { id: '3', name: 'Study Goals' },
  ])

  const allProjects = computed<ProjectGetters['allProjects']>(() => projects.value)
  const getProjectById: ProjectGetters['getProjectById'] = (id: string) => projects.value.find((project: Project) => project.id === id)

  const addProject: ProjectActions['addProject'] = (project: Project) => {
    projects.value.push(project)
  }

  const editProject: ProjectActions['editProject'] = (updatedProject: Project) => {
    const index = projects.value.findIndex((project: Project) => project.id === updatedProject.id)
    if (index !== -1) {
      projects.value[index] = updatedProject
    }
  }

  const deleteProject: ProjectActions['deleteProject'] = (id: string) => {
    projects.value = projects.value.filter((project: Project) => project.id !== id)
  }

  return {
    projects,
    allProjects,
    getProjectById,
    addProject,
    editProject,
    deleteProject,
  }
}, {
  persist: true,
})
