<template>
  <div class="default-layout flex flex-col md:flex-row min-h-screen bg-gray-100 font-inter text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
    <aside
      class="w-full md:w-64 bg-white shadow-md p-4 flex flex-col items-center md:items-start dark:bg-gray-800 dark:shadow-lg transition-colors duration-300"
    >
      <CommonLogo />
      <MenuMainNavigation />
      <div class="mt-auto w-full pt-4 border-t border-gray-200 dark:border-gray-700">
        <CommonColorToggler />
      </div>
    </aside>

    <main class="flex-1 container mx-auto p-6 md:p-8 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<style>
.router-link-active {
  @apply bg-blue-50 text-blue-600 font-semibold;
}
</style>
