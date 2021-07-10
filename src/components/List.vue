<template>
  <div class="list">
    <header>{{ title }}</header>
    <ul>
      <card v-for="card in cards" :key="card.id" v-bind:title="card.title"/>
    </ul>
    <footer>
      <a class="add-card">Add a card...</a>
    </footer>
  </div>

</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ICard } from '@/common/interface/card.d';
import Card from '@/components/Card.vue';

export default Vue.extend({
  name: 'List',
  components: {
    Card,
  },
  props: {
    title: String,
    cards: Object as PropType<ICard>,
  },
});
</script>

<style lang="scss" scoped>

$list-width: 300px;
$gap: 10px;
$scrollbar-thickness: 17px;
$list-header-height: 36px;
$list-footer-height: 36px;
$list-border-radius: 5px;
$list-bg-color: #e2e4e6;

.list {
  width: $list-width;
  height: calc(100% - #{$gap} - #{$scrollbar-thickness});

  > * {
    background-color: $list-bg-color;
    color: #333;
    padding: 0 $gap;
  }

  header {
    line-height: $list-header-height;
    font-size: 16px;
    font-weight: bold;
    border-top-left-radius: $list-border-radius;
    border-top-right-radius: $list-border-radius;
  }

  footer {
    line-height: $list-footer-height;
    border-bottom-left-radius: $list-border-radius;
    border-bottom-right-radius: $list-border-radius;

    .add-card {
      display: flex;
      color: #838c91;
      text-align: left;
      cursor: pointer;
      padding: $gap;
    }

    .add-card:hover {
      border-radius: 5px;
      color: #4d4d4d;
      text-decoration: underline;
    }
  }

  ul {
    list-style: none;
    margin: 0;

    max-height: calc(100% - #{$list-header-height} - #{$list-footer-height});
    overflow-y: auto;
  }
}
</style>
