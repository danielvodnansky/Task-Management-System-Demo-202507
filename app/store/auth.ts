import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Initialize loggedIn state. For persistence, this would typically
    // be loaded from localStorage or a cookie. Pinia persistedstate will handle this.
    loggedIn: false,
  }),
  getters: {
    isLoggedIn: state => state.loggedIn,
  },
  actions: {
    login () {
      this.loggedIn = true
      navigateTo('/')
    },
    logout () {
      this.loggedIn = false
      navigateTo('/login')
    },
  },
  persist: true,
})
