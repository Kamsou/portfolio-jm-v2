import * as prismic from '@prismicio/client'

export default defineEventHandler(async (event) => {
  const { public: { siteUrl } } = useRuntimeConfig()
  const base = String(siteUrl).replace(/\/$/, '')

  const staticPaths = ['/', '/work', '/info']
  let projectEntries: { loc: string; lastmod?: string }[] = []

  try {
    const client = prismic.createClient('jeanlemarques')
    const albums = await client.getAllByType('album')
    projectEntries = albums
      .filter((album) => album.uid)
      .map((album) => ({
        loc: `${base}/work/${album.uid}`,
        lastmod: album.last_publication_date
          ? new Date(album.last_publication_date).toISOString()
          : undefined
      }))
  } catch (error) {
    console.error('[sitemap] Impossible de récupérer les albums Prismic:', error)
  }

  const urls = [
    ...staticPaths.map((path) => ({ loc: `${base}${path}` })),
    ...projectEntries
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) =>
      `  <url>\n    <loc>${url.loc}</loc>${
        'lastmod' in url && url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''
      }\n  </url>`
  )
  .join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return body
})
