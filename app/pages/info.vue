

<script setup lang="ts">
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

useHead({
  title: 'Jean Marquès - Info'
})
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
