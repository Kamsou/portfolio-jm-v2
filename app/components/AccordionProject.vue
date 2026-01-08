<script setup lang="ts">
interface Props {
  album: any
}

const props = defineProps<Props>()

const { toggleAccordion: toggle, isOpen: checkIsOpen } = useAccordion()
const { removeCompress } = usePrismicImage()

const body = computed(() => props.album?.data?.body || [])

const isOpen = computed(() => checkIsOpen(props.album.id))

const accordionRef = ref<HTMLElement | null>(null)

async function toggleAccordion() {
  const wasOpen = isOpen.value
  await toggle(props.album.id)

  if (!wasOpen) {
    setTimeout(() => {
      if (accordionRef.value) {
        const headerElement = accordionRef.value.querySelector('.accordion-header')
        if (headerElement) {
          headerElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }, 100)
  }
}

function formatYear(date: string) {
  if (!date) return ''
  return new Date(date).getFullYear()
}
</script>

<template>
  <div ref="accordionRef" class="accordion-project">
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
        <div class="project-body">
          <div v-for="(slice, sliceIndex) in body" :key="sliceIndex" class="project-slice">
            <!-- Text slice -->
            <div v-if="slice.slice_type === 'text'" class="text-content">
              <PrismicRichText :field="slice.primary.text" />
            </div>

            <!-- Image gallery slice -->
            <div v-else-if="slice.slice_type === 'image_gallery'" class="project-images">
              <ProjectImage
                v-for="(slide, index) in slice.items"
                :key="index"
                :image="slide.picture"
                :image-src="removeCompress(slide.picture)"
              />
            </div>

            <!-- Slideshow slice -->
            <div v-else-if="slice.slice_type === 'slideshow'" class="slideshow-wrapper">
              <CarouselSlideshow :images="slice.items" />
            </div>

            <!-- Fallback: old format (default gallery) -->
            <div v-else class="project-images">
              <ProjectImage
                v-for="(slide, index) in slice.items"
                :key="index"
                :image="slide.picture"
                :image-src="removeCompress(slide.picture)"
              />
            </div>
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
    flex-direction: column;
    gap: 2px;
    align-items: baseline;

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

.project-body {
  padding-bottom: 40px;

  @media (max-width: $breakpoint-tablet) {
    padding-bottom: 30px;
  }
}

.project-slice {
  margin-bottom: 40px;

  @media (max-width: $breakpoint-tablet) {
    margin-bottom: 30px;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.text-content {
  max-width: 40vw;
  font-size: 14px;
  line-height: 1.6;
  color: #222222;

  @media (max-width: $breakpoint-tablet) {
    max-width: 90vw;
    font-size: 13px;
  }
}

.slideshow-wrapper {
  margin: 0;
}
</style>
