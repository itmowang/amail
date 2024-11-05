// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: "amail.xmw.pw",
      EMAIL_DOMAIN: "xmw.pw"
    }
  },
  app: {
    head: {
      title: "魔王临时邮箱 - xmw.pw",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '这一一个使用nuxtjs编写的临时邮箱' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
        }
      ],
      script: [
        {
          src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback',
          defer: true,
        },
      ],
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    preset: "cloudflare-pages"
  },
  modules: ["nitro-cloudflare-dev", "@nuxtjs/tailwindcss"]
})