import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  const publicRoutes = ['/login']

  if (!authStore.isLoggedIn && !publicRoutes.includes(to.path)) {
    if (to.path !== '/login') {
      return navigateTo('/login')
    }
  }

  if (authStore.isLoggedIn && to.path === '/login') {
    return navigateTo('/')
  }
})
