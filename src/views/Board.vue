<template>
  <div>
    <div class="board-data">
      <nav v-if="!showInput" class="navbar board" @click="showInput = true">{{ board.title }}</nav>
      <b-form-input class="title-input"
                    v-if="showInput"
                    v-model="boardTitle"
                    @keyup.enter="updateTitle"
                    @blur="updateTitle"
                    @keyup.esc="showInput = false"
                    type="text"
                    placeholder="Enter new title"
      ></b-form-input>
      <BoardSidebar :id="board_id"></BoardSidebar>
    </div>
    <div class="lists">
      <List v-for="list in board.lists"
            :title="list.title"
            :cards="list.cards"
            :id="list.id"
            :boardId="board_id"
            :key="list.id"
      />
      <button v-if="!showInputList"
              @click="showInputList = true"
              class="add-list-btn btn">Add a list...
      </button>
      <b-form-input class="title-input"
                    v-if="showInputList"
                    v-model="listTitle"
                    @keyup.enter="createList"
                    @keyup.esc="showInputList = false"
                    type="text"
                    placeholder="Enter new title"
      ></b-form-input>
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
      boardTitle: '',
      listTitle: '',
      showInput: false,
      showInputList: false,
      board_id: +this.$route.params.board_id,
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
      api.put(`/board/${this.board_id}`, { title: this.boardTitle })
        .then(({ status }) => {
          if (status === 200) {
            this.$store.dispatch('getBoard', this.board_id);
          }
        }, (error) => {
          this.boardTitle = error.response.data.error.message;
        });

      this.showInput = false;
    },
    createList() {
      api.post(`/board/${this.board_id}/list`, { title: this.listTitle, position: Object.values(this.board.lists).length })
        .then(({ status }) => {
          if (status === 200) {
            this.listTitle = '';
            this.$store.dispatch('getBoard', this.board_id);
          }
        }, (error) => {
          this.listTitle = error.response.data.error.message;
        });
      this.showInputList = false;
    },
  },

  async mounted() {
    await this.$store.dispatch('getBoard', this.board_id);
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

.board-data {
  display: flex;
  padding: 10px;
  justify-content: space-between;
}
</style>
