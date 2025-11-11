export const usePrismic = () => {
  const { $prismic } = useNuxtApp()

  return {
    client: $prismic
  }
}
