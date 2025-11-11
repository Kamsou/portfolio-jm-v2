<template>
  <div v-show="isShow" class="carousel-item fit" @click="emit('next')">
    <img class="imageCarousel" :src="removeCompress(slide.image)" :alt="slide.image.alt">
    <div class="elements-carousel">
      <div class="carouselTitle">
        <PrismicRichText :field="slide.title" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { asImageSrc } from '@prismicio/client'
import { computed } from 'vue'

interface Slide {
  image: any
  title: any
}

interface CurrentSlide {
  id: string
  index: number
}

const props = defineProps<{
  slide: Slide
  currentSlides: CurrentSlide[]
  index: number
  id: string
}>()

const emit = defineEmits<{
  (e: 'next'): void
}>()

const isShow = computed(() => {
  return props.currentSlides.find(slide => slide.id === props.id)?.index === props.index
})

const removeCompress = (image: any) => {
  return asImageSrc(image, { auto: undefined })
}
</script>

<style lang="scss" scoped>
.fit {
  width: fit-content;
  cursor: pointer;

  @media (max-width: $breakpoint-tablet) {
    width: 90vw;
    margin: 0 auto;
  }
}

.carouselTitle {
  font-size: 13px;
}

.elements-carousel {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  color: #222222;
  height: 30px;
  margin-top: 15px;

  @media (max-width: $breakpoint-tablet) {
    margin-top: 0px;
  }
}
</style>
