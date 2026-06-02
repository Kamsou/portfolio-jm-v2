<template>
  <article v-if="gallery">
    <Carousel>
      <CarouselSlide
        v-for="(slide, index) in slides"
        :key="index"
        :index="Number(index)"
        :visible-slide="visibleSlide"
      >
        <div class="fit">
          <img
            :src="slide.src"
            :srcset="slide.srcset"
            :sizes="imageSizes"
            :alt="slide.alt"
            :loading="index === 0 ? 'eager' : 'lazy'"
            decoding="async"
          >
          <div class="clickable-area left" @click="left" />
          <div class="clickable-area right" @click="nextSlide" />
          <div class="elements-carousel">
            <div class="pagination-left">
              <div class="element-number">
                <span>{{ Number(index) + 1 }} - {{ slidesLen }}</span>
              </div>

              <div class="element-pagination">
                <a class="prev" role="button" aria-label="Image précédente" @click="left">
                  <p>&lt;</p>
                </a>

                <a class="next" role="button" aria-label="Image suivante" @click="nextSlide">
                  <p>&gt;</p>
                </a>
              </div>
            </div>

            <span class="title">{{ slide.alt }}</span>
          </div>
        </div>
      </CarouselSlide>
    </Carousel>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const { client } = usePrismic()
const { imageSrcSet, imageSrc, imageSizes } = usePrismicImage()

const { data } = await useAsyncData(`album-${route.params.uid}`, async () => {
  try {
    const response = await client.getByUID('album', route.params.uid as string)
    return response
  } catch (error) {
    console.error('Error fetching album:', error)
    return null
  }
})

const doc = computed(() => data.value?.data)
const gallery = computed(() => doc.value?.body?.[0]?.items || [])
const visibleSlide = ref(0)

const slidesLen = computed(() => gallery.value.length)

// Pré-calcule le srcset responsive de chaque slide (évite de recalculer dans le template)
const slides = computed(() =>
  gallery.value.map((slide: any) => ({
    alt: slide.picture?.alt || '',
    ...imageSrcSet(slide.picture)
  }))
)

const keycodeGallery = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight') {
    nextSlide()
  } else if (event.key === 'ArrowLeft') {
    left()
  }
}

const left = () => {
  const max = visibleSlide.value > 0
  visibleSlide.value = max ? visibleSlide.value - 1 : slidesLen.value - 1
}

const nextSlide = () => {
  const max = visibleSlide.value >= slidesLen.value - 1
  visibleSlide.value = max ? 0 : visibleSlide.value + 1
}

onMounted(() => {
  window.addEventListener('keydown', keycodeGallery)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', keycodeGallery)
})

const projectTitle = computed(() => doc.value?.title?.[0]?.text || 'Projet')
const { public: { siteUrl } } = useRuntimeConfig()

const ogImage = computed(() =>
  gallery.value[0]?.picture ? imageSrc(gallery.value[0].picture, 1200) : ''
)

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: projectTitle.value,
  url: `${siteUrl}/work/${route.params.uid}`,
  inLanguage: 'fr-FR',
  author: { '@type': 'Person', name: 'Jean Marquès', jobTitle: 'Photographe' },
  image: slides.value.map((s: any) => s.src).filter(Boolean)
}))

useSeo(() => ({
  title: `${projectTitle.value} — Jean Marquès`,
  description: `${projectTitle.value} : série photographique de Jean Marquès.`,
  path: `/work/${route.params.uid}`,
  type: 'article',
  image: ogImage.value,
  jsonLd: jsonLd.value
}))
</script>

<style lang="scss" scoped>
.fit {
  position: relative;
}

.clickable-area {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  cursor: pointer;
}

.clickable-area.left {
  left: 0;
}

.clickable-area.right {
  right: 0;
}

img {
  width: auto;
  height: 40vw;

  @media (max-width: $breakpoint-tablet) {
    height: 70vw;
    display: block;
    margin: 0 auto;
    touch-action: manipulation;
  }
}

.elements-carousel {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  color: #222222;
  margin-top: 15px;

  @media (max-width: $breakpoint-tablet) {
    margin-top: 22px;
  }

  .element-number {
    span {
      display: block;
      font-size: 10px;
      margin-left: 5px;
    }
  }

  .element-pagination {
    padding-left: 30px;
    display: flex;
    gap: 15px;
    font-size: 10px;

    @media (max-width: $breakpoint-tablet) {
      padding-left: 15px;
      width: 90px;
    }

    .prev,
    .next {
      width: 0.6vw;
      height: 1.278vw;
      cursor: pointer;
      display: flex;
      align-items: center;

      @media (max-width: $breakpoint-tablet) {
        width: 8.389vw;
        height: 8.278vw;

        p {
          font-size: 20px;
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}

.title {
  font-size: 13px;
  padding-left: 20px;

  @media (max-width: $breakpoint-tablet) {
    width: 60%;
    padding-left: 0;
  }
}

.fit {
  width: fit-content;

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
