<template>
  <li>
    {{ title }}
  </li>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Card',
  props: {
    title: String,
  },
});
</script>

<style lang="scss" scoped>
$gap: 10px;
$card-border-radius: 3px;

li {
  background-color: #fff;
  padding: $gap;

  &:not(:last-child) {
    margin-bottom: $gap;
  }

  border-radius: $card-border-radius;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  img {
    display: block;
    width: calc(100% + 2 * #{$gap});
    margin: -$gap 0 $gap (-$gap);
    border-top-left-radius: $card-border-radius;
    border-top-right-radius: $card-border-radius;
  }
}
</style>
