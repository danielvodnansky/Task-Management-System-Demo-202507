<template>
  <div class="default-layout flex flex-col md:flex-row min-h-screen bg-gray-100 font-inter">
    <aside
      class="w-full md:w-64 bg-white shadow-md p-4 flex flex-col items-center md:items-start"
    >
      <div class="text-2xl font-bold text-gray-800 mb-8">
        Task Management
      </div>
      <nav class="w-full">
        <ul>
          <li class="mb-2">
            <NuxtLink
              class="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-colors duration-200"
              to="/"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h3v-3m0 0h-3m0 0h-3m0 0v3m0 0a1 1 0 001 1h3m-3 0h3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              All Tasks
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              class="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-colors duration-200"
              to="/projects"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              Projects
            </NuxtLink>
          </li>
          <li class="mt-4 text-sm font-semibold text-gray-500 uppercase px-2">
            Your Projects
          </li>
          <li class="mb-1">
            <NuxtLink
              class="flex items-center p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md text-sm transition-colors duration-200"
              to="/projects/1"
            >
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-3" />
              Project Alpha
            </NuxtLink>
          </li>
          <li class="mb-1">
            <NuxtLink
              class="flex items-center p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md text-sm transition-colors duration-200"
              to="/projects/2"
            >
              <span class="w-2 h-2 bg-green-400 rounded-full mr-3" />
              Project Beta
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="flex-1 p-6 md:p-8 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<style>
.router-link-active {
  @apply bg-blue-50 text-blue-600 font-semibold;
}
</style>
