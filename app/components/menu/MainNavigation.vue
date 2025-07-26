<template>
  <nav class="main-navigation w-full">
    <ul>
      <li class="mb-2">
        <!-- Using MenuNavLink for "All Tasks" -->
        <MenuNavLink
          icon-name="home"
          label="All Tasks"
          to="/"
        />
      </li>
      <li class="mb-2">
        <!-- Using MenuNavLink for "Projects" overview -->
        <MenuNavLink
          icon-name="project"
          label="Projects"
          to="/projects"
        />
      </li>
      <li class="mt-4 text-sm font-semibold text-gray-500 uppercase px-2">
        Your Projects
      </li>
      <!-- Using MenuProjectNavLink for individual project links -->
      <li
        v-for="project in projectStore.allProjects"
        :key="project.id"
        class="mb-1"
      >
        <MenuProjectNavLink
          :color="getProjectColor(project.id)"
          :project-name="project.name"
          :to="`/projects/${project.id}`"
        />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { useProjectStore } from '~/store/projects'
import MenuNavLink from './MenuNavLink.vue'
import MenuProjectNavLink from './MenuProjectNavLink.vue'

const projectStore = useProjectStore()

// Simple color mapping for demonstration, you might want a more robust system
const projectColors: { [key: string]: string } = {
  '1': '#60A5FA', // blue-400
  '2': '#34D399', // green-400
  '3': '#A78BFA', // purple-400
  // Add more as needed
}

const getProjectColor = (projectId: string) => {
  return projectColors[projectId] || '#9CA3AF' // Default to gray-400
}
</script>

<style scoped>
/* No specific styles needed here as styling is handled by child components */
</style>
