<template>
  <div class="container mt-4">
    <h3>Election results</h3>
    <ElectionOptions />
  </div>
</template>

<script>
import ElectionOptions from './components/ElectionOptions.vue'

export default {
  name: 'App',
  components: {
    ElectionOptions
  }
}
</script>
