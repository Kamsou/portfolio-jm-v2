// https://nuxt.com/docs/api/configuration/nuxt-config
import * as prismic from '@prismicio/client'

const SITE_URL = 'https://jeanmarques.com'
const PRISMIC_REPO = 'jeanlemarques'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,

  css: ['~/assets/styles/main.scss'],

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/variables.scss" as *;'
        }
      }
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml'],
      failOnError: false
    },
    // Les pages projet ne sont liées nulle part dans l'UI : on les injecte au build.
    hooks: {
      async 'prerender:routes'(routes) {
        try {
          const client = prismic.createClient(PRISMIC_REPO)
          const albums = await client.getAllByType('album')
          for (const album of albums) {
            if (album.uid) routes.add(`/work/${album.uid}`)
          }
        } catch (error) {
          console.error('[prerender] Impossible de récupérer les albums Prismic:', error)
        }
      }
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Jean Marquès — Photographe',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          key: 'description',
          name: 'description',
          content:
            'Portfolio du photographe Jean Marquès : séries, projets et collaborations en photographie.'
        },
        { name: 'author', content: 'Jean Marquès' },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { name: 'theme-color', content: '#ffffff' },
        { key: 'og:locale', property: 'og:locale', content: 'fr_FR' },
        { key: 'og:site_name', property: 'og:site_name', content: 'Jean Marquès' },
        { key: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
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
