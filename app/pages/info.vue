

<script setup lang="ts">
import { asText } from '@prismicio/client'

const { client } = usePrismic()

const { data } = await useAsyncData('info', async () => {
  try {
    const response = await client.getSingle('info')
    return response
  } catch (error) {
    console.error('Error fetching info:', error)
    return null
  }
})

const info = computed(() => data.value?.data)

const { public: { siteUrl } } = useRuntimeConfig()

const bio = computed(() => asText(info.value?.paragraphe) || '')
const description = computed(() => {
  const text = bio.value.trim()
  if (!text) return 'À propos de Jean Marquès, photographe.'
  return text.length > 160 ? `${text.slice(0, 157)}…` : text
})

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${siteUrl}/info`,
  inLanguage: 'fr-FR',
  mainEntity: {
    '@type': 'Person',
    name: 'Jean Marquès',
    jobTitle: 'Photographe',
    description: bio.value || undefined,
    sameAs: ['https://www.instagram.com/jeanmarques.jm/']
  }
}))

useSeo(() => ({
  title: 'Info — Jean Marquès',
  description: description.value,
  path: '/info',
  type: 'website',
  jsonLd: jsonLd.value
}))
</script>

<template>
  <div class="info" v-if="info">
    <PrismicRichText :field="info.paragraphe" />
  </div>
</template>

<style lang="scss">
.info {
  display: block;
  font-size: 14px;

  @media (max-width: $breakpoint-tablet) {
    padding: 5%;
  }

  p {
    margin-bottom: 0.25em;

    a {
      text-decoration: none;
      color: #000;
    }

    img {
      @media (max-width: $breakpoint-tablet) {
        width: 100%;
      }
    }

    em {
      display: block;
      margin-top: 1em;
      margin-bottom: 0.1em;
      font-style: normal;
    }
  }
}
</style>
