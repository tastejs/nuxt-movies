
<template>
  <main class="main">
    <SearchResults
      v-if="searchResultsShown"
      :title="title"
      :items="items"
      :loading="loading"
      @loadMore="loadMore" />
  </main>
</template>

<script>
import { search } from '~/services/tmdbAPI';
import SearchResults from '~/components/search/SearchResults';
let fromPagePath = '/';

export default {
  components: {
    SearchResults
  },

  beforeRouteEnter(to, from, next) {
    fromPagePath = from.path;
    next();
  },

  beforeRouteUpdate(to, from, next) {
    next();
    // TODO: <
    // TODO: could use `fetch` Re: https://nuxtjs.org/blog/understanding-how-fetch-works-in-nuxt-2-12
    // TODO: >
    this.getResults();
  },

  beforeRouteLeave(to, from, next) {
    // TODO: <
    // TODO: double-check
    // TODO: >
    const search = document.getElementById('search');

    next();

    if (search?.value.length) {
      this.$search.closeSearchForm();
    }
  },

  async asyncData({
    query,
    error,
    redirect
  }) {
    try {
      if (query.q) {
        const items = await search(query.q, 1);
        return { items };
      } else {
        redirect('/');
      }
    } catch {
      error({ message: 'Page not found' });
    }
  },

  data() {
    return {
      // TODO: <
      // TODO: should use enums for loading state
      // TODO: >
      loading: false
    };
  },

  head() {
    return {
      title: 'Search',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Search'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.FRONTEND_URL}${this.$route.path}`
        }
      ],
      bodyAttrs: {
        class: 'page page-search'
      }
    };
  },

  computed: {
    query() {
      return this.$route.query.q || '';
    },

    title() {
      return this.query ? `Results For: ${this.query}` : '';
    },

    searchResultsShown() {
      return this.items?.results.length;
    }
  },

  mounted() {
    this.$search.openSearchForm();
    this.$search.setFromPage(fromPagePath);
  },

  methods: {
    async getResults() {
      // if no search query
      if (!this.query.length) {
        this.items = null;
        return;
      }

      // trigger ajax call;
      const data = await search(this.query);

      // if no results, do nothing
      if (!data.total_results) {
        this.items = null;
        return;
      }

      // update the items
      this.items = data;
    },

    loadMore() {
      this.loading = true;

      // TODO: <
      // TODO: could use a query parameter for the selected page to be persisted
      // TODO: >
      search(this.query, this.items.page + 1).then(response => {
        this.items.results = this.items.results.concat(response.results);
        this.items.page = response.page;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss">
@import '~/assets/css/utilities/_variables.scss';

.page-search .main {
  padding-top: 6rem;

  @media (min-width: $breakpoint-large) {
    padding-top: 8rem;
  }
}
</style>
