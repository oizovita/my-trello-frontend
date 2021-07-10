<template>
  <div class="ui">
    <nav class="navbar app">My Trello</nav>
    <nav class="navbar board">{{ title }}</nav>
    <div class="lists">
        <List v-for="list in lists" :title="list.title" :cards="list.cards" :key="list.id"/>
        <button class="add-list-btn btn">Add a list...</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import List from '@/components/List.vue';

export default Vue.extend({
  name: 'Board',
  components: {
    List,
  },
  data() {
    console.log('test');
    return {
      title: 'Моя тестовая доска',
      lists: [
        {
          id: 1,
          title: 'Планы',
          cards: [
            { id: 1, title: 'помыть кота' },
            { id: 2, title: 'приготовить суп' },
            { id: 3, title: 'сходить в магазин' },
          ],
        },
        {
          id: 2,
          title: 'В процессе',
          cards: [
            { id: 4, title: 'посмотреть сериал' },
          ],
        },
        {
          id: 3,
          title: 'Сделано',
          cards: [
            { id: 5, title: 'сделать домашку' },
            { id: 6, title: 'погулять с собакой' },
          ],
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
$appbar-height: 40px;
$navbar-height: 50px;
$gap: 10px;
$board-bg-color: #0079bf;
$appbar-bg-color: #0067a3;

.ui {
  height: 100vh;
  display: grid;
  grid-template-rows: $appbar-height $navbar-height 1fr;
  background-color: $board-bg-color;
  color: #eee;
}

.navbar {
  padding-left: $gap;
  display: flex;
  align-items: center;
  &.app {
    background-color: $appbar-bg-color;
    font-size: 1.5rem;
  }
  &.board {
    font-size: 1.1rem;
  }
}

.lists {
  display: flex;
  overflow-x: auto;
  > * {
    flex: 0 0 auto;
    margin-left: $gap;
  }
  &::after {
    content: '';
    flex: 0 0 $gap;
  }
}

.add-list-btn {
  width: 300px;
  height: 50px;
  font-size: 16px;
  background-color: #006aa7;
  color: #a5cae0;
  padding: 10px;
  border-radius: 0.3rem;
  cursor: pointer;
  text-align: left;
}

.add-list-btn:hover {
  background-color: #005485;
}
</style>
