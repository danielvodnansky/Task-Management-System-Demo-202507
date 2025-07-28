import { defineStore } from 'pinia'
import type { Project } from '~/types/Project'

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
  }),

  getters: {
    allProjects: (state): Project[] => state.projects,
    getProjectById: state => (id: string): Project | undefined => state.projects.find((project: Project) => project.id === id),
  },

  actions: {
    async fetchProjects () {
      try {
        const response = await $fetch<Project[]>('/api/projects')
        this.projects = response
        console.log('Fetched projects:', this.projects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    },
    async addProject (project: Omit<Project, 'id'>) {
      try {
        const newProject = await $fetch<Project>('/api/projects', {
          method: 'POST',
          body: project,
        })
        this.projects.push(newProject)
        console.log('Added project:', newProject)
      } catch (error) {
        console.error('Error adding project:', error)
      }
    },
    async editProject (updatedProject: Project) {
      try {
        const response = await $fetch<Project>(`/api/projects/${updatedProject.id}`, {
          method: 'PUT',
          body: updatedProject,
        })
        const index = this.projects.findIndex((p: Project) => p.id === response.id)
        if (index !== -1) {
          this.projects[index] = response
          console.log('Edited project:', response)
        }
      } catch (error) {
        console.error('Error editing project:', error)
      }
    },
    async deleteProject (id: string) {
      try {
        await $fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        })
        this.projects = this.projects.filter((project: Project) => project.id !== id)
        console.log('Deleted project:', id)
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    },
  },
})
