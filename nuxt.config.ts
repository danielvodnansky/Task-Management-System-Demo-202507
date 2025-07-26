// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  typescript: {
    typeCheck: true,
  },
  tailwindcss: {},
  eslint: {
    config: {
      stylistic: true,
    },
  },
  piniaPersistedstate: {
    storage: 'localStorage',
  },
  css: [
    '~/assets/css/transitions.css',
  ],
  ssr: false,
})
