import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import { UPDATE_BOARDS, UPDATE_BOARD } from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: {},
    boards: [],
    user: {},
  },
  mutations: {
    [UPDATE_BOARDS](state, boards) {
      state.boards = boards;
    },
    [UPDATE_BOARD](state, board) {
      state.board = board;
    },
  },
  actions: {
    async getBoards({ commit }) {
      const { data: { boards } } = await api.get('/board');
      commit(UPDATE_BOARDS, boards);
    },
    async getBoard({ commit }, board) {
      const { data } = await api.get(`board/${board.id}`);
      commit(UPDATE_BOARD, data);
    },

  },
  modules: {},
  getters: {
    boards: (state) => state.boards,
    board: (state) => state.board,
  },

});
