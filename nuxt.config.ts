// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    '@nuxt/test-utils/module'
  ],

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/lobby",
      include: ['/admin(/*)?', '/lobby(/*)?', '/game(/*)?', '/profile(/*)?', '/api/auth(/*)?'],
      exclude: ["/", "/login", "/signup", "/forgot-password", "/reset-password", "/404", "/500", '/public/**', '/api/public/**', '/images/**', '/favicon.ico', '/robots.txt', '/sitemap.xml', '/logout'],
    }
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    config: {
      theme: {
        extend: {
          aspectRatio: {
            auto: "auto",
            square: "1 / 1",
            video: "16 / 9",
          },
        },
      },
    },
  },

  compatibilityDate: "2024-12-23",
});