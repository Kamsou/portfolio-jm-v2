import * as prismic from '@prismicio/client'
import { PrismicRichText, PrismicText } from '@prismicio/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const client = prismic.createClient('jeanlemarques', {
    routes: [
      {
        type: 'album',
        path: '/work/:uid'
      }
    ]
  })

  // Register components globally
  nuxtApp.vueApp.component('PrismicRichText', PrismicRichText)
  nuxtApp.vueApp.component('PrismicText', PrismicText)

  return {
    provide: {
      prismic: client,
      prismicClient: client
    }
  }
})
