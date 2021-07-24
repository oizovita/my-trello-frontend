<template>
  <div class="boards">
    <BoardCard
      v-for="board in boards"
      :key="board.id"
      :title="board.title"
      :id="board.id">
    </BoardCard>
    <BoardModal></BoardModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'; // @ is an alias to /src
import BoardCard from '@/components/BoardCard.vue';
import BoardModal from '@/components/BoardModal.vue';

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      modalShow: false,
    };
  },
  components: { BoardCard, BoardModal },
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
</style>
