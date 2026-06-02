// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,

  css: ['~/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/variables.scss" as *;'
        }
      }
    }
  },

  app: {
    head: {
      title: 'Jean Marquès',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { key: 'description', name: 'description', content: 'Portfolio Jean Marquès' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Ouvre la connexion au CDN d'images Prismic dès le chargement (gain sur le 1er affichage).
        // Pas de crossorigin : les <img> Prismic se chargent sans CORS, une connexion non-CORS doit être réchauffée.
        { rel: 'preconnect', href: 'https://images.prismic.io' },
        { rel: 'dns-prefetch', href: 'https://images.prismic.io' },
        // Précharge la police pour éviter le saut de rendu
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/helvetica-regular.woff2',
          crossorigin: ''
        }
      ]
    }
  }
})
