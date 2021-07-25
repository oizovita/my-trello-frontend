<template>
  <div class="list">
    <header>
      <p class="header_title" v-if="!showInput" @click="showInput = true">{{ title }}</p>
      <b-form-input class="title-input"
                    size="sm"
                    v-if="showInput"
                    v-model="newTitle"
                    @keyup.enter="updateList"
                    @blur="updateList"
                    @keyup.esc="showInput = false"
                    type="text"
                    placeholder="Enter new title"
      ></b-form-input>
      <b-dropdown dropright
                  size="sm"
                  text="..."
                  class="m-2"
                  no-caret
                  variant="outline"
      >
        <b-dropdown-item-button @click="deleteList">Delete list</b-dropdown-item-button>
      </b-dropdown>
    </header>

    <ul>
      <Card v-for="card in cards"
            :key="card.id"
            :title="card.title"
      />
    </ul>
    <footer>
      <a v-if="!showInputCard" class="add-card" @click="showInputCard = true">Add a card...</a>
      <b-form-input class="card-input"
                    v-if="showInputCard"
                    v-model="cardTitle"
                    @keyup.enter="createCard"
                    @keyup.esc="showInputCard = false"
                    type="text"
                    placeholder="Enter new title"
      ></b-form-input>
    </footer>
  </div>

</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ICard } from '@/common/interface/card.d';
import Card from '@/components/Card.vue';
import api from '@/api';

export default Vue.extend({
  name: 'List',
  components: {
    Card,
  },
  props: {
    title: String,
    cards: Object as PropType<ICard>,
    id: Number,
    boardId: Number,
  },
  data() {
    return {
      newTitle: '',
      cardTitle: '',
      showInput: false,
      showInputCard: false,
    };
  },
  methods: {
    updateList() {
      api.put(`/board/${this.boardId}/list/${this.id}`, { title: this.newTitle })
        .then(({ status }) => {
          if (status === 200) {
            this.$store.dispatch('getBoard', this.boardId);
          }
        }, (error) => {
          this.newTitle = error.response.data.error.message;
        });
      this.showInput = false;
    },
    deleteList() {
      api.delete(`/board/${this.boardId}/list/${this.id}`, { title: this.newTitle })
        .then(({ status }) => {
          if (status === 200) {
            this.$store.dispatch('getBoard', this.boardId);
          }
        }, (error) => {
          this.newTitle = error.response.data.error.message;
        });
    },
    createCard() {
      api.post(`/board/${this.boardId}/card`,
        { title: this.cardTitle, position: Object.values(this.cards).length, list_id: this.id })
        .then(({ status }) => {
          if (status === 200) {
            this.cardTitle = '';
            this.$store.dispatch('getBoard', this.boardId);
          }
        }, (error) => {
          this.cardTitle = error.response.data.error.message;
        });
      this.showInputCard = false;
    },
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
    display: flex;
    justify-content: space-between;
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

    .card-input {
      padding: 10px;
      border-radius: 3px;
    }

  }

  ul {
    list-style: none;
    margin: 0;

    max-height: calc(100% - #{$list-header-height} - #{$list-footer-height});
    overflow-y: auto;
  }

  .title-input{
    margin: 5px
  }
}
</style>
