export function useAccordion() {
  const openAccordionId = useState<string | null>('openAccordionId', () => null)

  async function toggleAccordion(id: string) {
    if (openAccordionId.value === id) {
      // Si on clique sur l'accordéon ouvert, on le ferme
      openAccordionId.value = null
    } else {
      // Si un autre accordéon est ouvert, d'abord le fermer
      if (openAccordionId.value !== null) {
        openAccordionId.value = null
        // Attendre que l'animation de fermeture se termine (300ms)
        await new Promise(resolve => setTimeout(resolve, 300))
      }
      // Puis ouvrir le nouveau
      openAccordionId.value = id
    }
  }

  function isOpen(id: string) {
    return openAccordionId.value === id
  }

  return {
    toggleAccordion,
    isOpen
  }
}
