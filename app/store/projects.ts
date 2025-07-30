import { defineStore } from 'pinia'
import type { Project } from '~/types/Project'

// 1. Define the State Interface
interface ProjectState {
  projects: Project[];
}

// 2. Define the Getters Interface
interface ProjectGetters extends Record<string, (state: ProjectState) => any> {
  allProjects: (state: ProjectState) => Project[];
  getProjectById: (state: ProjectState) => (id: string) => Project | undefined;
}

// 3. Define the Actions Interface
interface ProjectActions {
  addProject: (project: Project) => void;
  editProject: (updatedProject: Project) => void;
  deleteProject: (id: string) => void;
}

export const useProjectStore = defineStore<'projects', ProjectState, ProjectGetters, ProjectActions>('projects', {
  state: () => ({
    projects: [
      { id: '1', name: 'Work Tasks' },
      { id: '2', name: 'Personal Errands' },
      { id: '3', name: 'Study Goals' },
    ] as Project[], // initial data
    xx: '',
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
