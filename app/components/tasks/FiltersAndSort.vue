<template>
  <div class="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center">
    <!-- Filter by Status -->
    <div class="w-full md:w-auto">
      <label
        class="block text-sm font-medium text-gray-700 mb-1"
        for="filterStatus"
      >Status:</label>
      <select
        id="filterStatus"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        :value="taskStore.filterStatus"
        @change="(event: Event) => taskStore.setFilterStatus((event.target as HTMLSelectElement).value as TaskFilterStatus)"
      >
        <option value="all">
          All
        </option>
        <option value="active">
          Active
        </option>
        <option value="completed">
          Completed
        </option>
      </select>
    </div>

    <!-- Filter by Priority -->
    <div class="w-full md:w-auto">
      <label
        class="block text-sm font-medium text-gray-700 mb-1"
        for="filterPriority"
      >Priority:</label>
      <select
        id="filterPriority"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        :value="taskStore.filterPriority"
        @change="(event: Event) => taskStore.setFilterPriority((event.target as HTMLSelectElement).value as TaskFilterPriority)"
      >
        <option value="all">
          All
        </option>
        <option value="low">
          Low
        </option>
        <option value="medium">
          Medium
        </option>
        <option value="high">
          High
        </option>
      </select>
    </div>

    <!-- Sort By -->
    <div class="w-full md:w-auto">
      <label
        class="block text-sm font-medium text-gray-700 mb-1"
        for="sortBy"
      >Sort By:</label>
      <select
        id="sortBy"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        :value="taskStore.sortBy"
        @change="(event: Event) => taskStore.setSortBy((event.target as HTMLSelectElement).value as TaskSortBy)"
      >
        <option value="dueDate">
          Due Date
        </option>
        <option value="title">
          Title
        </option>
      </select>
    </div>

    <!-- Clear All Filters Button -->
    <div class="w-full md:w-auto flex items-end">
      <button
        class="w-full md:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 text-sm mt-auto"
        @click="taskStore.clearAllFilters()"
      >
        Clear All Filters
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTaskStore } from '~/store/tasks'
import type { TaskFilterPriority, TaskFilterStatus, TaskSortBy } from '~/types/TaskFilterOptions'

const taskStore = useTaskStore()
</script>
