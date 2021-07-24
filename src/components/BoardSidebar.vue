<template>
  <div>
    <b-button variant="outline-primary" v-b-toggle.sidebar-right>Menu</b-button>
    <b-sidebar id="sidebar-right" title="Menu" right>
      <div class="px-3 py-2">
        <b-button variant="danger" @click="deleteBoard">Delete Board</b-button>
      </div>
    </b-sidebar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import api from '@/api';

export default Vue.extend({
  name: 'BoardSidebar',
  props: {
    id: Number,
  },
  methods: {
    deleteBoard() {
      api.delete(`/board/${this.id}`)
        .then(({ status }) => {
          if (status === 200) {
            this.$router.push({ path: '/' });
          }
        }, (error) => {
          console.log(error.response.data.error.message);
        });
    },
  },
});
</script>

<style lang="scss" scoped>

</style>
