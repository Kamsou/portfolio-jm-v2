<template>
  <div class="project-image-wrapper">
    <img
      :src="srcSet.src"
      :srcset="srcSet.srcset"
      :sizes="imageSizes"
      :alt="image?.alt ?? ''"
      class="project-image"
      loading="lazy"
      decoding="async"
    >
    <p v-if="image?.alt" class="image-caption">
      {{ image.alt }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  image: any
}

const props = defineProps<Props>()

const { imageSrcSet, imageSizes } = usePrismicImage()

const srcSet = computed(() => imageSrcSet(props.image))
</script>

<style lang="scss" scoped>
.project-image-wrapper {
  margin-bottom: 30px;

  @media (max-width: $breakpoint-tablet) {
    margin-bottom: 20px;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.project-image {
  width: 100%;
  max-width: 40vw;
  height: auto;
  display: block;

  @media (max-width: $breakpoint-tablet) {
    max-width: 90vw;
  }
}

.image-caption {
  margin-top: 8px;
  font-size: 12px;
  color: #666666;
  text-align: left;

  @media (max-width: $breakpoint-tablet) {
    font-size: 11px;
  }
}
</style>
