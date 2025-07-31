import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface AuthState {
  loggedIn: boolean;
}

interface AuthGetters {
  isLoggedIn: boolean;
}

interface AuthActions {
  login: () => void;
  logout: () => void;
}

export const useAuthStore = defineStore('auth', () => {
  const loggedIn = ref<AuthState['loggedIn']>(false)

  const isLoggedIn = computed<AuthGetters['isLoggedIn']>(() => loggedIn.value)

  const login: AuthActions['login'] = () => {
    loggedIn.value = true
    navigateTo('/')
  }

  const logout: AuthActions['logout'] = () => {
    loggedIn.value = false
    navigateTo('/login')
  }

  return {
    loggedIn,
    isLoggedIn,
    login,
    logout,
  }
}, {
  persist: true,
})
