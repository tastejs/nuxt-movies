
<template>
  <div :class="$style.form">
    <form
      autocomplete="off"
      @submit.prevent>
      <label
        class="visuallyhidden"
        for="search">
        Search
      </label>

      <div :class="$style.field">
        <input
          id="search"
          ref="input"
          v-model.trim="query"
          name="search"
          type="text"
          placeholder="Search for a movie, tv show or person..."
          @keyup="goToRoute"
          @blur="unFocus">
        <button
          v-if="showButton"
          type="button"
          aria-label="Close"
          @click="goBack">
          <CrossIcon />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import CrossIcon from '~/assets/images/cross.svg?inline';

const SEARCH_PATHNAME = 'search';

export default {
  components: {
    CrossIcon
  },

  data() {
    return {
      query: this.$route.query.q ?? ''
    };
  },

  computed: {
    showButton() {
      return this.$route.name === SEARCH_PATHNAME;
    }
  },

  mounted() {
    this.$refs.input.focus();
  },

  methods: {
    goToRoute() {
      if (this.query) {
        this.$router.push({
          name: SEARCH_PATHNAME,
          query: { q: this.query }
        });
      } else {
        this.$router.push({
          path: this.$search.getSearchFromPagePath()
        });
      }
    },

    goBack() {
      this.query = '';

      this.$router.push({
        path: this.$search.getSearchFromPagePath()
      });
    },

    unFocus(event) {
      if (this.$route.name !== SEARCH_PATHNAME) {
        const target = event.relatedTarget;

        // TODO: `search-toggle` is hardcoded
        if (!target?.classList.contains('search-toggle')) {
          this.query = '';
          this.$search.closeSearchForm();
        }
      }
    }
  }
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.form {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;

  @media (min-width: $breakpoint-large) {
    left: $layout-nav-width;
  }

  input[type='text'] {
    flex: 1;
    height: 6rem;
    padding: 2.1rem 1.5rem;
    font-size: 1.6rem;
    color: #fff;
    background: none;
    border: 0;
    outline: 0;

    @media (min-width: $breakpoint-large) {
      height: 8rem;
      padding: 3.1rem 5rem;
    }
  }

  button {
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    background: none;

    @media (min-width: $breakpoint-large) {
      padding: 0 5rem;
    }
  }
}

.field {
  display: flex;
  background-color: $secondary-color;
}
</style>
