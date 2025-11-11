<template>
  <section v-if="page">
    <div v-for="(item, idx) in page" :key="idx">
      <div v-if="item.slice_type === 'image_description'" class="imageDescription">
        <img
          v-if="item.primary.image"
          :src="removeCompress(item.primary.image)"
          class="image"
          :alt="item.primary.image.alt || ''"
        >
        <PrismicRichText class="imageDescriptionText" :field="item.primary.label" />
      </div>

      <div v-else class="imageSlider">
        <div class="carousel">
          <div class="carousel-inner">
            <CarouselItem
              v-for="(slide, index) in item.items"
              :key="`item-${index}`"
              :id="getSliceId(item)"
              :slide="slide"
              :current-slides="currentSlides"
              :index="index"
              @next="next(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { asImageSrc } from '@prismicio/client'

const { client } = usePrismic()

const { data: pageData } = await useAsyncData('main-menu', async () => {
  try {
    const response = await client.getSingle('main_menu')
    return response
  } catch (error) {
    console.error('Error fetching main menu:', error)
    return null
  }
})

const page = ref(pageData.value?.data?.body || [])
const currentSlides = ref<Array<{ id: string; index: number }>>([])

onMounted(() => {
  const carouselSlices = page.value.filter((item: any) => item.slice_type !== 'image_description')

  currentSlides.value = carouselSlices.map((item: any) => ({
    id: getSliceId(item),
    index: 0
  }))
})

const getSliceId = (item: any) => {
  return item.id || `slice-${Math.random()}`
}

const removeCompress = (image: any) => {
  return asImageSrc(image, { auto: undefined })
}

const next = (item: any) => {
  const sliceId = getSliceId(item)
  const currentSlide = currentSlides.value.find(slide => slide.id === sliceId)

  if (currentSlide) {
    const newIndex = currentSlide.index >= item.items.length - 1 ? 0 : currentSlide.index + 1
    currentSlides.value = currentSlides.value.map(slide =>
      slide.id === sliceId ? { ...slide, index: newIndex } : slide
    )
  }
}

useHead({
  title: 'Jean Marquès'
})
</script>

<style lang="scss">
.image {
  width: 40vw;

  @media (max-width: $breakpoint-tablet) {
    width: 100%;
    margin: 0 auto;
  }
}

.imageCarousel {
  width: 40vw;

  @media (max-width: $breakpoint-tablet) {
    width: 100%;
    margin: 0 auto;
    touch-action: manipulation;
  }
}

.imageDescription {
  width: 40vw;

  @media (max-width: $breakpoint-tablet) {
    width: 100%;
    margin: 0 auto;
    touch-action: manipulation;
  }
}

.imageDescriptionText {
  text-align: right;
  font-size: 13px;

  @media (max-width: $breakpoint-tablet) {
    width: 100%;
  }
}

.imageDescription, .imageSlider {
  padding-bottom: 100px;

  @media (max-width: $breakpoint-tablet) {
    width: 90%;
    margin: 0 auto;
    touch-action: manipulation;
  }
}

.carouselTitle {
  font-size: 13px;
}

.title {
  font-size: 16px;

  &:hover {
    color: grey;
  }

  @media (max-width: $breakpoint-tablet) {
    width: 60%;
  }
}

.fit {
  width: fit-content;
  cursor: pointer;

  @media (max-width: $breakpoint-tablet) {
    width: 90vw;
    margin: 0 auto;
  }
}

.pagination-left {
  display: flex;
  align-items: center;

  @media (max-width: $breakpoint-tablet) {
    width: 40%;
  }
}
</style>
