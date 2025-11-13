<template>
  <div class="carousel-slideshow">
    <div class="carousel-container">
      <div
        v-if="currentImage"
        class="carousel-slide"
        @click="nextSlide"
      >
        <img
          :src="removeCompress(currentImage.picture)"
          :alt="currentImage.picture?.alt ?? ''"
          class="carousel-image"
        >
      </div>
    </div>
    <div class="carousel-controls">
      <div class="carousel-caption">
        <p v-if="currentImage?.picture?.alt" class="image-caption">
          {{ currentImage.picture.alt }}
        </p>
      </div>
      <div class="carousel-counter">
        {{ currentSlide + 1 }} / {{ images.length }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  images: any[]
}

const props = defineProps<Props>()

const { removeCompress } = usePrismicImage()

const currentSlide = ref(0)

const currentImage = computed(() => props.images[currentSlide.value])

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % props.images.length
}
</script>

<style lang="scss" scoped>
.carousel-slideshow {
  margin: 30px 0;

  @media (max-width: $breakpoint-tablet) {
    margin: 20px 0;
  }
}

.carousel-container {
  position: relative;
  width: 100%;
}

.carousel-slide {
  cursor: pointer;
  width: 100%;
}

.carousel-image {
  width: 100%;
  max-width: 40vw;
  height: auto;
  display: block;

  @media (max-width: $breakpoint-tablet) {
    max-width: 90vw;
  }
}

.carousel-controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 8px;
  gap: 20px;
}

.carousel-caption {
  flex: 1;
}

.image-caption {
  font-size: 12px;
  color: #666666;
  text-align: right;
  margin: 0;

  @media (max-width: $breakpoint-tablet) {
    font-size: 11px;
  }
}

.carousel-counter {
  font-size: 12px;
  color: #666666;
  white-space: nowrap;

  @media (max-width: $breakpoint-tablet) {
    font-size: 11px;
  }
}
</style>
