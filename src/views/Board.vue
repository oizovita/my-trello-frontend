<template>
  <div>
    <div class="board-data">
      <nav v-if="!showInput" class="navbar board" @click="showInput = true">{{ board.title }}</nav>
      <b-form-input class="title-input"
                    v-if="showInput"
                    v-model="title"
                    @keyup.enter="updateTitle"
                    @blur="updateTitle"
                    type="text"
                    placeholder="Enter new title"
      ></b-form-input>
      <BoardSidebar :id="+this.$route.params.board_id"></BoardSidebar>
    </div>
    <div class="lists">
      <List v-for="list in board.lists" :title="list.title" :cards="list.cards" :key="list.id"/>
      <button class="add-list-btn btn">Add a list...</button>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import List from '@/components/List.vue';
import api from '@/api';
import BoardSidebar from '@/components/BoardSidebar.vue';

export default Vue.extend({
  name: 'Board',
  data() {
    return {
      title: '',
      showInput: false,
    };
  },
  components: {
    List, BoardSidebar,
  },
  computed: {
    board() {
      return this.$store.state.board;
    },
  },
  methods: {
    updateTitle() {
      api.put(`/board/${this.$route.params.board_id}`, { title: this.title })
        .then(({ status }) => {
          if (status === 200) {
            this.$store.dispatch('getBoard', this.$route.params.board_id);
          }
        }, (error) => {
          this.title = error.response.data.error.message;
        });

      this.showInput = false;
    },
  },

  async mounted() {
    await this.$store.dispatch('getBoard', this.$route.params.board_id);
  },
});
</script>

<style lang="scss" scoped>
$gap: 10px;

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

.title-input {
  width: 300px;
}

.board-data{
  display: flex;
  padding: 10px;
  justify-content: space-between;
}
</style>
