<script setup lang="ts">
import { asImageSrc } from '@prismicio/client'

interface Props {
  album: any
}

const props = defineProps<Props>()

const isOpen = ref(false)

const gallery = computed(() => props.album?.data?.body?.[0]?.items || [])

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}

const removeCompress = (image: any) => {
  return asImageSrc(image, { auto: undefined })
}

const formatYear = (date: string) => {
  if (!date) return ''
  return new Date(date).getFullYear()
}
</script>

<template>
  <div class="accordion-project">
    <button
      class="accordion-header"
      @click="toggleAccordion"
      :aria-expanded="isOpen"
    >
      <span class="project-info">
        <span class="project-title">{{ album.data.title?.[0]?.text }}</span>
        <span class="project-year">{{ formatYear(album.first_publication_date) }}</span>
      </span>
      <span class="accordion-icon">{{ isOpen ? '−' : '+' }}</span>
    </button>

    <Transition name="accordion">
      <div v-show="isOpen" class="accordion-content">
        <div class="project-images">
          <div
            v-for="(slide, index) in gallery"
            :key="index"
            class="project-image-wrapper"
          >
            <img
              :src="removeCompress(slide.picture)"
              :alt="slide.picture?.alt || ''"
              class="project-image"
            >
            <p v-if="slide.picture?.alt" class="image-caption">
              {{ slide.picture.alt }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.accordion-project {
  border-bottom: 1px solid #000000;

  &:first-child {
    border-top: 1px solid #000000;
  }
}

.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 15px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  text-align: left;
  color: #222222;
  transition: opacity 0.2s ease;

  @media (max-width: $breakpoint-tablet) {
    font-size: 13px;
    padding: 12px 0;
  }

  &:hover {
    opacity: 0.6;
  }

  .project-info {
    display: flex;
    gap: 30px;
    align-items: baseline;

    @media (max-width: $breakpoint-tablet) {
      gap: 15px;
      flex-direction: column;
    }

    .project-title {
      font-weight: normal;
    }

    .project-year {
      color: #666666;
      font-size: 13px;

      @media (max-width: $breakpoint-tablet) {
        font-size: 12px;
      }
    }
  }

  .accordion-icon {
    font-size: 18px;
    line-height: 1;
    margin-left: 20px;
    flex-shrink: 0;
  }
}

.accordion-content {
  overflow: hidden;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 10000px;
}

.project-images {
  padding-bottom: 40px;

  @media (max-width: $breakpoint-tablet) {
    padding-bottom: 30px;
  }
}

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
  max-width: 60vw;
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
  text-align: right;

  @media (max-width: $breakpoint-tablet) {
    font-size: 11px;
  }
}
</style>
