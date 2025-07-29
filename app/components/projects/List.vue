<template>
  <div>
    <div
      v-if="projectStore.allProjects.length === 0"
      class="text-center text-gray-500 py-8"
    >
      No projects found. Start by adding a new one!
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProjectsCard
        v-for="project in projectStore.allProjects"
        :key="project.id"
        :color="getProjectColor(project.id)"
        :project="project"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from '~/store/projects'
import { getProjectColor } from '~/utils/projectColors'

const projectStore = useProjectStore()
</script>
