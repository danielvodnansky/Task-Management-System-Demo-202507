import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Task } from '~/types/Task'
import type { TaskFilterStatus, TaskFilterPriority, TaskSortBy } from '~/types/TaskFilterOptions'

interface TaskState {
  tasks: Task[];
  filterStatus: TaskFilterStatus;
  filterPriority: TaskFilterPriority;
  sortBy: TaskSortBy;
  selectedProjectId: string | undefined;
}

interface TaskGetters {
  allTasks: Task[];
  activeTasks: Task[];
  completedTasks: Task[];
  getTasksByProjectId: (projectId: string) => Task[];
  getFilteredAndSortedTasks: Task[];
}

interface TaskActions {
  addTask: (task: Omit<Task, 'uuid' | 'completed'>) => void;
  editTask: (updatedTask: Task) => void;
  deleteTask: (uuid: string) => void;
  deleteTasksByProjectId: (projectId: string) => void;
  toggleTaskCompletion: (uuid: string) => void;
  setFilterStatus: (status: TaskFilterStatus) => void;
  setFilterPriority: (priority: TaskFilterPriority) => void;
  setSortBy: (sortBy: TaskSortBy) => void;
  setProjectId: (projectId: string | undefined) => void;
  clearAllFilters: () => void;
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<TaskState['tasks']>([
    {
      uuid: uuidv4(),
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, fruits',
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      priority: 'high',
      projectId: '1',
      completed: false,
    },
    {
      uuid: uuidv4(),
      title: 'Finish report',
      description: 'Complete the Q3 financial report',
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
      priority: 'medium',
      projectId: '1',
      completed: false,
    },
    {
      uuid: uuidv4(),
      title: 'Call mom',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      priority: 'low',
      projectId: '2',
      completed: true,
    },
    {
      uuid: uuidv4(),
      title: 'Learn Nuxt 3',
      description: 'Read documentation and build a small app',
      dueDate: new Date(Date.now() + 86400000 * 10).toISOString(),
      priority: 'high',
      projectId: '3',
      completed: false,
    },
  ])
  const filterStatus = ref<TaskState['filterStatus']>('all')
  const filterPriority = ref<TaskState['filterPriority']>('all')
  const sortBy = ref<TaskState['sortBy']>('dueDate')
  const selectedProjectId = ref<TaskState['selectedProjectId']>(undefined)

  const allTasks = computed<TaskGetters['allTasks']>(() => tasks.value)
  const activeTasks = computed<TaskGetters['activeTasks']>(() => tasks.value.filter((task: Task) => !task.completed))
  const completedTasks = computed<TaskGetters['completedTasks']>(() => tasks.value.filter((task: Task) => task.completed))
  const getTasksByProjectId: TaskGetters['getTasksByProjectId'] = (projectId: string) =>
    tasks.value.filter((task: Task) => task.projectId === projectId)

  const getFilteredAndSortedTasks = computed<TaskGetters['getFilteredAndSortedTasks']>(() => {
    let filtered = [...tasks.value]

    if (selectedProjectId.value !== undefined) {
      filtered = filtered.filter((task: Task) => task.projectId === selectedProjectId.value)
    }

    if (filterStatus.value === 'active') {
      filtered = filtered.filter((task: Task) => !task.completed)
    } else if (filterStatus.value === 'completed') {
      filtered = filtered.filter((task: Task) => task.completed)
    }

    if (filterPriority.value !== 'all') {
      filtered = filtered.filter((task: Task) => task.priority === filterPriority.value)
    }

    filtered.sort((a: Task, b: Task) => {
      if (sortBy.value === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      } else {
        return a.title.localeCompare(b.title)
      }
    })

    return filtered
  })

  const addTask: TaskActions['addTask'] = (task: Omit<Task, 'uuid' | 'completed'>) => {
    const newTask: Task = {
      uuid: uuidv4(),
      completed: false,
      ...task,
    }
    tasks.value.push(newTask)
  }

  const editTask: TaskActions['editTask'] = (updatedTask: Task) => {
    const index = tasks.value.findIndex((t: Task) => t.uuid === updatedTask.uuid)
    if (index !== -1) {
      tasks.value[index] = updatedTask
    }
  }

  const deleteTask: TaskActions['deleteTask'] = (uuid: string) => {
    tasks.value = tasks.value.filter((task: Task) => task.uuid !== uuid)
  }

  const deleteTasksByProjectId: TaskActions['deleteTasksByProjectId'] = (projectId: string) => {
    tasks.value = tasks.value.filter((task: Task) => task.projectId !== projectId)
  }

  const toggleTaskCompletion: TaskActions['toggleTaskCompletion'] = (uuid: string) => {
    const task = tasks.value.find((task: Task) => task.uuid === uuid)
    if (task) {
      task.completed = !task.completed
    }
  }

  const setFilterStatus: TaskActions['setFilterStatus'] = (status: TaskFilterStatus) => {
    filterStatus.value = status
  }

  const setFilterPriority: TaskActions['setFilterPriority'] = (priority: TaskFilterPriority) => {
    filterPriority.value = priority
  }

  const setSortBy: TaskActions['setSortBy'] = (newSortBy: TaskSortBy) => {
    sortBy.value = newSortBy
  }

  const setProjectId: TaskActions['setProjectId'] = (projectId: string | undefined) => {
    selectedProjectId.value = projectId
  }

  const clearAllFilters: TaskActions['clearAllFilters'] = () => {
    filterStatus.value = 'all'
    filterPriority.value = 'all'
    sortBy.value = 'dueDate'
    selectedProjectId.value = undefined
  }

  return {
    tasks,
    filterStatus,
    filterPriority,
    sortBy,
    selectedProjectId,
    allTasks,
    activeTasks,
    completedTasks,
    getTasksByProjectId,
    getFilteredAndSortedTasks,
    addTask,
    editTask,
    deleteTask,
    deleteTasksByProjectId,
    toggleTaskCompletion,
    setFilterStatus,
    setFilterPriority,
    setSortBy,
    setProjectId,
    clearAllFilters,
  }
}, {
  persist: true,
})
