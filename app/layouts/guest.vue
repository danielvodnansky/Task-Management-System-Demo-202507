<template>
  <div class="guest-layout flex flex-col items-center justify-center min-h-screen bg-gray-100 font-inter text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 p-4">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm text-center flex flex-col items-center">
      <!-- Logo at the top of the login card -->
      <CommonLogo class="mb-6" />

      <!-- Slot for the actual login page content -->
      <slot />

      <!-- Dark Mode Toggler at the bottom of the login card -->
      <div class="w-full pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
        <CommonColorToggler />
      </div>
    </div>
  </div>
</template>
