import { asImageSrc } from '@prismicio/client'

export function usePrismicImage() {
  function removeCompress(image: any) {
    return asImageSrc(image, { auto: undefined }) ?? ''
  }

  return {
    removeCompress
  }
}
