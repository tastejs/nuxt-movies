
import Vue from 'vue';

export default function (_ctx, inject) {
  const state = Vue.observable({
    searchFormOpen: false,
    fromPagePath: '/'
  });

  inject('search', {
    toggleSearchForm() {
      state.searchFormOpen = !state.searchFormOpen;
    },

    openSearchForm() {
      state.searchFormOpen = true;
    },

    closeSearchForm() {
      state.searchFormOpen = false;
    },

    setFromPage(page) {
      state.fromPagePath = page;
    },

    checkSearchFormOpen() {
      return state.searchFormOpen;
    },

    getSearchFromPagePath() {
      return state.fromPagePath;
    }
  });
}
