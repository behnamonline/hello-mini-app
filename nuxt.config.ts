// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    experimental: {
      database: true
    },
    database: {
      mainDB_cf: {
        connector: "cloudflare-d1",
        options: {
          bindingName: "db_link"
        }

      },
      mainDB_local: {
        connector: "sqlite",
        options: {
          name: "db_file"
        }
      }
    }
  }
})
