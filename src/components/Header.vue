<template>
  <header>
    <router-link class="btn-header" to="/">Boards</router-link>
    <nav class="navbar">My Trello</nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Header',
});
</script>

<style lang="scss" scoped>
header {
  box-sizing: border-box;
  background-color: #0067a3;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0;
  padding: 1rem;

  .navbar {
    align-self: center;
    color: #eceff1;
    font-size: 1.2rem;
    font-weight: bold;
    padding-left: 500px;
    display: flex;
    align-items: center;
  }
}

.btn-header {
  background-color: #455A64;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 0 0.5px rgba(49,49,93,.03),
  0 2px 5px 0 rgba(49,49,93,.1),
  0 1px 2px 0 rgba(0,0,0,.08);
  color: #B0BEC5;
  cursor: pointer;
  text-decoration: none;
  padding: 0.5rem;
  margin: 0 0.5rem
}
</style>
