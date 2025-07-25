// store/tasks.ts
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { Task, TaskPriority } from '~/types'
import type { TaskFilterStatus, TaskFilterPriority, TaskSortBy } from '~/types/TaskFilterOptions'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [
      {
        uuid: uuidv4(),
        title: 'Buy groceries',
        description: 'Milk, eggs, bread, fruits',
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
        priority: 'high',
        projectId: 1,
        completed: false,
      },
      {
        uuid: uuidv4(),
        title: 'Finish report',
        description: 'Complete the Q3 financial report',
        dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
        priority: 'medium',
        projectId: 1,
        completed: false,
      },
      {
        uuid: uuidv4(),
        title: 'Call mom',
        dueDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        priority: 'low',
        projectId: 2,
        completed: true,
      },
      {
        uuid: uuidv4(),
        title: 'Learn Nuxt 3',
        description: 'Read documentation and build a small app',
        dueDate: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days from now
        priority: 'high',
        projectId: 3,
        completed: false,
      },
    ] as Task[],
    // Centralized filter and sort states
    filterStatus: 'all' as TaskFilterStatus,
    filterPriority: 'all' as TaskFilterPriority,
    sortBy: 'dueDate' as TaskSortBy,
    selectedProjectId: undefined as number | undefined, // New state for project filter
  }),

  getters: {
    allTasks: state => state.tasks,
    activeTasks: state => state.tasks.filter((task: Task) => !task.completed),
    completedTasks: state => state.tasks.filter((task: Task) => task.completed),
    getTasksByProjectId: state => (projectId: number) =>
      state.tasks.filter((task: Task) => task.projectId === projectId),

    // This getter now uses the store's internal filter and sort states
    getFilteredAndSortedTasks: (state) => {
      let filteredTasks = state.tasks

      // Filter by project ID if selected
      if (state.selectedProjectId !== undefined) {
        filteredTasks = filteredTasks.filter((task: Task) => task.projectId === state.selectedProjectId)
      }

      // Filter by completion status
      if (state.filterStatus === 'active') {
        filteredTasks = filteredTasks.filter((task: Task) => !task.completed)
      } else if (state.filterStatus === 'completed') {
        filteredTasks = filteredTasks.filter((task: Task) => task.completed)
      }

      // Filter by priority
      if (state.filterPriority !== 'all') {
        filteredTasks = filteredTasks.filter((task: Task) => task.priority === state.filterPriority)
      }

      // Sort tasks
      filteredTasks.sort((a: Task, b: Task) => {
        if (state.sortBy === 'dueDate') {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        } else {
          return a.title.localeCompare(b.title)
        }
      })

      return filteredTasks
    },
  },

  actions: {
    addTask (task: Omit<Task, 'uuid' | 'completed'>) {
      const newTask: Task = {
        uuid: uuidv4(),
        completed: false,
        ...task,
      }
      this.tasks.push(newTask)
    },
    editTask (updatedTask: Task) {
      const index = this.tasks.findIndex((task: Task) => task.uuid === updatedTask.uuid)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
    },
    deleteTask (uuid: string) {
      this.tasks = this.tasks.filter((task: Task) => task.uuid !== uuid)
    },
    toggleTaskCompletion (uuid: string) {
      const task = this.tasks.find((task: Task) => task.uuid === uuid)
      if (task) {
        task.completed = !task.completed
      }
    },
    // Actions to update filter and sort states
    setFilterStatus (status: TaskFilterStatus) {
      this.filterStatus = status
    },
    setFilterPriority (priority: TaskFilterPriority) {
      this.filterPriority = priority
    },
    setSortBy (sortBy: TaskSortBy) {
      this.sortBy = sortBy
    },
    setProjectId (projectId: number | undefined) {
      this.selectedProjectId = projectId
    },
    // Action to clear all filters
    clearAllFilters () {
      this.filterStatus = 'all'
      this.filterPriority = 'all'
      this.sortBy = 'dueDate'
      this.selectedProjectId = undefined
    },
  },
  persist: true,
})
