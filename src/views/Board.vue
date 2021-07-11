<template>
  <div>
    <nav class="navbar board">{{ board.title }}</nav>
    <div class="lists">
        <List v-for="list in board.lists" :title="list.title" :cards="list.cards" :key="list.id"/>
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
  computed: {
    board() {
      console.log(this.$store.state.board.lists);
      return this.$store.state.board;
    },
  },
  async mounted() {
    await this.$store.dispatch('getBoard', { id: this.$route.params.board_id });
  },
});
</script>

<style lang="scss" scoped>
$appbar-height: 40px;
$navbar-height: 50px;
$gap: 10px;
$board-bg-color: #0079bf;
$appbar-bg-color: #0067a3;

.navbar {
  padding-left: 10px;
  display: flex;
  align-items: center;
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
  background-color: #e2e4e6;
  color: #333333;
  padding: 10px;
  border-radius: 0.3rem;
  cursor: pointer;
  text-align: left;
}

.add-list-btn:hover {
  background-color: #90a4ae;
}
</style>
