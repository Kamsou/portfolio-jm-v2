<template>
  <div v-show="visibleSlide === index" class="carousel">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visibleSlide: number
  index: number
}>()
</script>
