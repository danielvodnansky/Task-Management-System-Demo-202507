import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
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
