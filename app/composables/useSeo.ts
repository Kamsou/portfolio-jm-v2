// SEO/GEO d'une page : meta, canonical, Open Graph/Twitter, JSON-LD.

interface SeoInput {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, any> | Record<string, any>[]
}

export function useSeo(input: MaybeRefOrGetter<SeoInput>) {
  const { public: { siteUrl } } = useRuntimeConfig()

  const resolved = computed(() => toValue(input))
  const canonical = computed(() => `${siteUrl}${resolved.value.path}`)
  // Pas d'image par défaut : émettre une URL inexistante donnerait un og:image en 404.
  const image = computed(() => resolved.value.image || undefined)

  useSeoMeta({
    title: () => resolved.value.title,
    description: () => resolved.value.description,
    ogTitle: () => resolved.value.title,
    ogDescription: () => resolved.value.description,
    ogType: () => resolved.value.type || 'website',
    ogUrl: () => canonical.value,
    ogImage: () => image.value,
    twitterTitle: () => resolved.value.title,
    twitterDescription: () => resolved.value.description,
    twitterImage: () => image.value
  })

  const head = useHead({
    link: [{ rel: 'canonical', href: () => canonical.value }],
    script: computed(() => {
      const blocks = resolved.value.jsonLd
      if (!blocks) return []
      const list = Array.isArray(blocks) ? blocks : [blocks]
      return list.map((block) => ({
        type: 'application/ld+json',
        innerHTML: JSON.stringify(block)
      }))
    })
  })

  return { canonical, head }
}
