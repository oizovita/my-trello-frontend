<template>
  <div class="boards">
    <BoardCard
      v-for="board in boards"
      :key="board.id"
      :title="board.title"
      :id="board.id">
    </BoardCard>
    <button class="btn-add-board">Add new board...</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'; // @ is an alias to /src
import BoardCard from '@/components/BoardCard.vue';

export default Vue.extend({
  name: 'Home',
  components: { BoardCard },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
  },
  async mounted() {
    await this.$store.dispatch('getBoards');
  },
});
</script>

<style lang="scss" scoped>
.boards {
  display: flex;
  justify-content: start;
  padding-top: 1rem;
  flex-flow: row wrap;
  padding-left: 6rem;
}

.btn-add-board {
  background-color: #546E7A;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 0 0 0.5px rgba(49, 49, 93, .03),
  0 2px 5px 0 rgba(49, 49, 93, .1),
  0 1px 2px 0 rgba(0, 0, 0, .08);
  color: #ffffff;
  font-size: 1.2rem;
  margin: 0.5rem 1.5rem;
  outline: 0;
  padding: 1rem;
  transition: all 600ms ease;
  height: 100px;
  width: 100%;

  @media screen and (min-width: 600px) {
    width: 33%;
  }
  @media screen and (min-width: 1024px) {
    width: 250px;
  }

}

.btn-add-board:hover {
  background-color: #838c91;
  font-weight: bold;
}

</style>
