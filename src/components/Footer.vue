<template>
  <footer>
    <span>Izovita Oles 2021</span>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Footer',
});
</script>

<style scoped lang="scss">

footer {
  box-sizing: border-box;
  background-color: #cfd8dc;
  bottom: 0;
  left: 0;
  padding: 1rem;
  position: absolute;
  width: 100%;

  a {
    text-decoration: none;
    color: #546E7A;
  }

}
</style>
