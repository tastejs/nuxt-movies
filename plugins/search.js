import Vue from 'vue'

export default function (_ctx, inject) {
  const state = Vue.observable({
    searchOpen: false,
    fromPage: '/'
  })

  inject('search', {
    toggleSearch () {
      state.searchOpen = !state.searchOpen
    },

    openSearch () {
      state.searchOpen = true
    },

    closeSearch () {
      state.searchOpen = false
    },

    setFromPage (page) {
      state.fromPage = page
    }
  })
}
