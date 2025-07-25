import { defineStore } from 'pinia'
import type { Project } from '~/types/Project'

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [
      { id: '1', name: 'Work Tasks' },
      { id: '2', name: 'Personal Errands' },
      { id: '3', name: 'Study Goals' },
    ] as Project[], // initial data
  }),

  getters: {
    allProjects: (state): Project[] => state.projects,
    getProjectById: state => (id: string): Project | undefined => state.projects.find((project: Project) => project.id === id),
  },

  actions: {
    addProject (project: Project) {
      this.projects.push(project)
    },
    editProject (updatedProject: Project) {
      const index = this.projects.findIndex((project: Project) => project.id === updatedProject.id)
      if (index !== -1) {
        this.projects[index] = updatedProject
      }
    },
    deleteProject (id: string) {
      this.projects = this.projects.filter((project: Project) => project.id !== id)
    },
  },
  persist: true,
})
