<template>
  <div>
    <b-button class="btn-add-board" v-b-modal.modal>Add new board...</b-button>
    <b-modal id="modal" title="Create Board" @hidden="resetForm" @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Title" label-for="title-input" invalid-feedback="Title is required">
          <b-form-input id="title-input" v-model="title" :state="required" required></b-form-input>
          <p class="text-sm-start text-danger" v-if="error">{{ error }}</p >
        </b-form-group>
      </form>
      <div v-if="showSpinner" class="text-center p-lg-4">
        <b-spinner variant="primary"></b-spinner>
      </div>

    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import api from '@/api';

export default Vue.extend({
  name: 'BoardModal',
  data() {
    return {
      title: '',
      error: '',
      required: null,
      showSpinner: false,
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.required = valid;
      return valid;
    },
    resetForm() {
      this.title = '';
      this.required = null;
      this.error = '';
    },
    handleOk(event) {
      event.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.showSpinner = true;
      api.post('/board', { title: this.title })
        .then(({ status }) => {
          if (status === 200) {
            this.title = '';
            this.$store.dispatch('getBoards');
            this.$nextTick(() => {
              this.$bvModal.hide('modal');
            });
          }
        }, (error) => {
          this.error = error.response.data.error.message;
        }).finally(() => { this.showSpinner = false; });
    },
  },
});
</script>

<style lang="scss" scoped>
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
