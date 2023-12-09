<script setup>
import ElectionOptions from './components/ElectionOptions.vue'
</script>

<template>
  <!-- Probably don't need a <header> or anything for this simple app -->
  <main>
    <div class="container mt-4">
      <h3>Election results</h3>
      <ElectionOptions />
    </div>
  </main>
</template>
