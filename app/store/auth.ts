import { defineStore } from 'pinia'

interface AuthState {
  loggedIn: boolean;
}

interface AuthGetters extends Record<string, (state: AuthState) => any> {
  isLoggedIn: (state: AuthState) => boolean;
}

interface AuthActions {
  login: () => void;
  logout: () => void;
}

export const useAuthStore = defineStore<'auth', AuthState, AuthGetters, AuthActions>('auth', {
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
