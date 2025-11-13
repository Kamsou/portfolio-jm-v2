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

useHead({
  title: 'Jean Marquès'
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
