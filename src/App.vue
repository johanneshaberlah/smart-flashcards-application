<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { watch } from 'vue';
import './assets/main.css';

// Get the current route
const route = useRoute();

// Watch for changes in the route's meta title and update the document title
watch(
    () => route.meta.title as string | undefined,  // Ensure the title is treated as a string or undefined
    (newTitle) => {
      document.title = newTitle || 'Default Title';
    },
    { immediate: true } // Update the title immediately on load
);
</script>

<template>
  <RouterView />
</template>
