// store/tasks.ts
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { Task, TaskPriority } from '~/types'

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
  }),

  getters: {
    allTasks: state => state.tasks,
    activeTasks: state => state.tasks.filter((task: Task) => !task.completed),
    completedTasks: state => state.tasks.filter((task: Task) => task.completed),
    getTasksByProjectId: state => (projectId: number) =>
      state.tasks.filter((task: Task) => task.projectId === projectId),
    getFilteredAndSortedTasks: state => (
      filterStatus: 'all' | 'active' | 'completed',
      filterPriority: TaskPriority | 'all',
      sortBy: 'dueDate' | 'title',
      projectId?: number,
    ) => {
      let filteredTasks = state.tasks

      if (projectId !== undefined) {
        filteredTasks = filteredTasks.filter((task: Task) => task.projectId === projectId)
      }

      if (filterStatus === 'active') {
        filteredTasks = filteredTasks.filter((task: Task) => !task.completed)
      } else if (filterStatus === 'completed') {
        filteredTasks = filteredTasks.filter((task: Task) => task.completed)
      }

      if (filterPriority !== 'all') {
        filteredTasks = filteredTasks.filter((task: Task) => task.priority === filterPriority)
      }

      filteredTasks.sort((a: Task, b: Task) => {
        if (sortBy === 'dueDate') {
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
  },
  persist: true,
})
