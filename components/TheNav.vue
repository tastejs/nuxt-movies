
<template>
  <nav :class="$style.nav">
    <ul class="nolist">
      <li>
        <nuxt-link
          exact
          :to="{ name: 'index' }"
          aria-label="Home">
          <HomeIcon />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ name: 'movie' }"
          aria-label="Movies">
          <MovieIcon />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ name: 'tv' }"
          aria-label="TV Shows">
          <TvIcon />
        </nuxt-link>
      </li>
      <li>
        <button
          class="search-toggle"
          type="button"
          aria-label="Search"
          aria-haspopup="true"
          :aria-expanded="`${searchFormOpen}`"
          @click="toggleSearchForm">
          <MagnifierIcon />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import HomeIcon from '~/assets/images/home.svg?inline';
import MovieIcon from '~/assets/images/movie.svg?inline';
import TvIcon from '~/assets/images/tv.svg?inline';
import MagnifierIcon from '~/assets/images/magnifier.svg?inline';

// TODO: duplicated
const SEARCH_PATHNAME = 'search';

export default {
  components: {
    HomeIcon,
    MovieIcon,
    TvIcon,
    MagnifierIcon
  },

  computed: {
    searchFormOpen() {
      return this.$search.checkSearchFormOpen();
    }
  },
  methods: {
    toggleSearchForm() {
      if (this.$route.name !== SEARCH_PATHNAME) {
        this.$search.toggleSearchForm();
      }
    }
  }
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.nav {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  height: 4.5rem;
  background-color: #000;

  @media (min-width: $breakpoint-large) {
    top: 0;
    right: auto;
    width: $layout-nav-width;
    height: 100%;
    border-right: 1px solid $secondary-color;
  }

  ul {
    display: flex;
    height: 100%;

    @media (min-width: $breakpoint-large) {
      flex-direction: column;
    }

    li {
      flex: 1 1 auto;
      height: 100%;

      @media (min-width: $breakpoint-large) {
        flex: 0 1 auto;
        height: 10rem;
      }
    }
  }

  button {
    padding: 0;
    margin: 0;
    background: none;
  }

  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    outline: 0;
    transition: all 0.2s;

    &:hover,
    &:focus {
      opacity: 0.8;
    }
  }
}
</style>

<style lang="scss" scoped>
@import '~/assets/css/utilities/_variables.scss';

a.nuxt-link-active {
  &:hover,
  &:focus {
    opacity: 1;
  }

  svg g {
    stroke: $primary-color;
  }
}
</style>
