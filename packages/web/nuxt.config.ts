// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // routeRules: {
  //   // Generated at build time for SEO purpose
  //   '/': { prerender: true },
  //   // Cached for 1 hour
  //   '/api/*': { cache: { maxAge: 60 * 60 } },
  //   // Redirection to avoid 404
  //   '/old-page': {
  //     redirect: { to: '/new-page', statusCode: 302 }
  //   }
  //   // ...
  // },
  nitro: {
    preset: "cloudflare-pages"
  }, 
  modules: ["nitro-cloudflare-dev", "@nuxtjs/tailwindcss"]
})