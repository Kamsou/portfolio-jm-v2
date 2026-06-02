import { asImageSrc, asImageWidthSrcSet } from '@prismicio/client'

// Largeurs générées pour le srcset responsive.
// Le rendu max est 40vw desktop / 90vw mobile → 1920 couvre les grands écrans en rétina.
const RESPONSIVE_WIDTHS = [640, 960, 1280, 1920]

// Correspond au layout : 90vw sous le breakpoint tablette (768px), 40vw au-dessus.
const IMAGE_SIZES = '(max-width: 768px) 90vw, 40vw'

export function usePrismicImage() {
  // srcset responsive — conserve l'optimisation Prismic (auto=compress,format → WebP/AVIF)
  function imageSrcSet(image: any, widths: number[] = RESPONSIVE_WIDTHS) {
    const result = asImageWidthSrcSet(image, { widths })
    return {
      src: result?.src ?? '',
      srcset: result?.srcset ?? ''
    }
  }

  // src unique optimisé à une largeur donnée (fallback / og:image)
  function imageSrc(image: any, width = 1280) {
    return asImageSrc(image, { w: width }) ?? ''
  }

  return {
    imageSrcSet,
    imageSrc,
    imageSizes: IMAGE_SIZES
  }
}
