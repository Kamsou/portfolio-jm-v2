<script setup lang="ts">
const { client } = usePrismic()

const { data } = await useAsyncData('albums', async () => {
  try {
    const response = await client.getAllByType('album', {
      orderings: [
        { field: 'document.first_publication_date', direction: 'desc' }
      ]
    })
    return response
  } catch (error) {
    console.error('Error fetching albums:', error)
    return []
  }
})

const albums = computed(() => data.value || [])

const { public: { siteUrl } } = useRuntimeConfig()

const description =
  'Portfolio du photographe Jean Marquès : séries, projets et collaborations en photographie.'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jean Marquès',
    jobTitle: 'Photographe',
    url: siteUrl,
    sameAs: ['https://www.instagram.com/jeanmarques.jm/']
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Jean Marquès',
    url: siteUrl,
    inLanguage: 'fr-FR',
    author: { '@type': 'Person', name: 'Jean Marquès' }
  }
]

useSeo({
  title: 'Jean Marquès — Photographe',
  description,
  path: '/',
  type: 'website',
  jsonLd
})
</script>

<template>
  <div v-if="albums && albums.length !== 0" class="page-archive">
    <AccordionProject
      v-for="album in albums"
      :key="album.id"
      :album="album"
    />
  </div>
</template>

<style lang="scss" scoped>
.page-archive {
  max-width: 80vw;

  @media (max-width: $breakpoint-tablet) {
    max-width: 90vw;
    margin: 0 auto;
  }
}
</style>
