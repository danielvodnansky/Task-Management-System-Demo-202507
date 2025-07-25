<template>
  <div class="default-layout flex flex-col md:flex-row min-h-screen bg-gray-100 font-inter">
    <aside
      class="w-full md:w-64 bg-white shadow-md p-4 flex flex-col items-center md:items-start"
    >
      <CommonLogo />
      <MenuMainNavigation />
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
