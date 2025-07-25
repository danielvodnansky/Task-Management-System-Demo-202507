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
      <li class="mb-1">
        <MenuProjectNavLink
          color="blue"
          project-name="Project Alpha"
          to="/projects/1"
        />
      </li>
      <li class="mb-1">
        <MenuProjectNavLink
          color="green"
          project-name="Project Beta"
          to="/projects/2"
        />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import MenuNavLink from './MenuNavLink.vue'
import MenuProjectNavLink from './MenuProjectNavLink.vue'
</script>

<style scoped>
/* No specific styles needed here as styling is handled by child components */
</style>
