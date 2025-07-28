import { defineStore } from 'pinia'
import type { Task } from '~/types/Task' // Ensure Task is imported
import type { TaskFilterStatus, TaskFilterPriority, TaskSortBy } from '~/types/TaskFilterOptions'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    filterStatus: 'all' as TaskFilterStatus,
    filterPriority: 'all' as TaskFilterPriority,
    sortBy: 'dueDate' as TaskSortBy,
    selectedProjectId: undefined as string | undefined,
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
    async fetchTasks (projectId?: string) {
      try {
        const query = projectId ? { projectId } : {}
        const response = await $fetch<Task[]>('/api/tasks', { query })
        this.tasks = response
        console.log('Fetched tasks:', this.tasks)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    },
    async addTask (task: Omit<Task, 'uuid' | 'completed'>) {
      try {
        const newTask = await $fetch<Task>('/api/tasks', {
          method: 'POST',
          body: task,
        })
        this.tasks.push(newTask)
        console.log('Added task:', newTask)
      } catch (error) {
        console.error('Error adding task:', error)
      }
    },
    async editTask (updatedTask: Task) {
      try {
        const response = await $fetch<Task>(`/api/tasks/${updatedTask.uuid}`, {
          method: 'PUT',
          body: updatedTask,
        })
        const index = this.tasks.findIndex((t: Task) => t.uuid === response.uuid)
        if (index !== -1) {
          this.tasks[index] = response
          console.log('Edited task:', response)
        }
      } catch (error) {
        console.error('Error editing task:', error)
      }
    },
    async deleteTask (uuid: string) {
      try {
        await $fetch(`/api/tasks/${uuid}`, {
          method: 'DELETE',
        })
        this.tasks = this.tasks.filter((task: Task) => task.uuid !== uuid)
        console.log('Deleted task:', uuid)
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    },
    async deleteTasksByProjectId (projectId: string) {
      await this.fetchTasks(this.selectedProjectId)
      console.log(`Tasks for project ${projectId} deleted (via project delete endpoint).`)
    },
    toggleTaskCompletion (uuid: string) {
      const task = this.tasks.find((task: Task) => task.uuid === uuid)
      if (task) {
        task.completed = !task.completed
        this.editTask(task) // Re-use editTask for this
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
      this.fetchTasks() // Fetch all tasks when filters are cleared
    },
  },
})
