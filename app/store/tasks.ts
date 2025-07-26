import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { Task } from '~/types/Task'
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
        projectId: '1',
        completed: false,
      },
      {
        uuid: uuidv4(),
        title: 'Finish report',
        description: 'Complete the Q3 financial report',
        dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
        priority: 'medium',
        projectId: '1',
        completed: false,
      },
      {
        uuid: uuidv4(),
        title: 'Call mom',
        dueDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        priority: 'low',
        projectId: '2',
        completed: true,
      },
      {
        uuid: uuidv4(),
        title: 'Learn Nuxt 3',
        description: 'Read documentation and build a small app',
        dueDate: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days from now
        priority: 'high',
        projectId: '3',
        completed: false,
      },
    ] as Task[],
    filterStatus: 'all' as TaskFilterStatus,
    filterPriority: 'all' as TaskFilterPriority,
    sortBy: 'dueDate' as TaskSortBy,
    selectedProjectId: undefined as string | undefined, // New state for project filter
  }),

  getters: {
    allTasks: state => state.tasks,
    activeTasks: state => state.tasks.filter((task: Task) => !task.completed),
    completedTasks: state => state.tasks.filter((task: Task) => task.completed),
    getTasksByProjectId: state => (projectId: string) =>
      state.tasks.filter((task: Task) => task.projectId === projectId),
    getFilteredAndSortedTasks: (state) => {
      let filteredTasks = state.tasks
      if (state.selectedProjectId !== undefined) {
        filteredTasks = filteredTasks.filter((task: Task) => task.projectId === state.selectedProjectId)
      }
      if (state.filterStatus === 'active') {
        filteredTasks = filteredTasks.filter((task: Task) => !task.completed)
      } else if (state.filterStatus === 'completed') {
        filteredTasks = filteredTasks.filter((task: Task) => task.completed)
      }
      if (state.filterPriority !== 'all') {
        filteredTasks = filteredTasks.filter((task: Task) => task.priority === state.filterPriority)
      }
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
    deleteTasksByProjectId (projectId: string) {
      this.tasks = this.tasks.filter((task: Task) => task.projectId !== projectId)
    },
    toggleTaskCompletion (uuid: string) {
      const task = this.tasks.find((task: Task) => task.uuid === uuid)
      if (task) {
        task.completed = !task.completed
      }
    },
    setFilterStatus (status: TaskFilterStatus) {
      this.filterStatus = status
    },
    setFilterPriority (priority: TaskFilterPriority) {
      this.filterPriority = priority
    },
    setSortBy (sortBy: TaskSortBy) {
      this.sortBy = sortBy
    },
    setProjectId (projectId: string | undefined) {
      this.selectedProjectId = projectId
    },
    clearAllFilters () {
      this.filterStatus = 'all'
      this.filterPriority = 'all'
      this.sortBy = 'dueDate'
      this.selectedProjectId = undefined
    },
  },
  persist: true,
})
