<script setup lang="ts">
const { client } = usePrismic()

const { data } = await useAsyncData('albums', async () => {
  try {
    const response = await client.getAllByType('album', {
      orderings: [
        { field: 'my.album.order', direction: 'asc' },
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

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Travaux — Jean Marquès',
  url: `${siteUrl}/work`,
  inLanguage: 'fr-FR',
  about: { '@type': 'Person', name: 'Jean Marquès', jobTitle: 'Photographe' },
  hasPart: albums.value.map((album: any) => ({
    '@type': 'CreativeWork',
    name: album.data?.title?.[0]?.text || 'Projet',
    url: `${siteUrl}/work/${album.uid}`
  }))
}))

useSeo(() => ({
  title: 'Travaux — Jean Marquès',
  description:
    'Sélection de séries et projets photographiques de Jean Marquès.',
  path: '/work',
  type: 'website',
  jsonLd: jsonLd.value
}))
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
