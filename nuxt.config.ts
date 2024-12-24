// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
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
});
