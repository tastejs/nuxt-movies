
<template>
  <main class="main">
    <TheTopNav :title="metaTitle" />

    <Listing
      v-if="listingShown"
      :title="title"
      :items="items"
      :loading="loading"
      @loadMore="loadMore" />
  </main>
</template>

<script>
import {
  getTrending,
  getTvShows,
  getListItem
} from '~/services/tmdbAPI';
import TheTopNav from '~/components/TheTopNav';
import Listing from '~/components/Listing';
import { CACHE_LIMIT } from '~/config/cache';

export default {
  components: {
    TheTopNav,
    Listing
  },

  data() {
    return {
      loading: false,
      items: {}
    };
  },

  async fetch() {
    try {
      this.items =
        this.$route.params.name === 'trending' ?
          await getTrending('tv') :
          await getTvShows(this.$route.params.name);
    } catch {
      this.$nuxt.error({ message: 'Page not found' });
    }
  },

  head() {
    return {
      title: this.metaTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.metaTitle
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.FRONTEND_URL}${this.$route.path}`
        }
      ],
      bodyAttrs: {
        class: 'topnav-active'
      }
    };
  },

  computed: {
    metaTitle() {
      return this.title;
    },

    title() {
      return getListItem('tv', this.$route.params.name).TITLE;
    },

    listingShown() {
      return this.items?.results?.length;
    }
  },

  activated() {
    if (this.$fetchState.timestamp <= Date.now() - CACHE_LIMIT) {
      this.$fetch();
    }
  },

  methods: {
    loadMore() {
      this.loading = true;

      if (this.$route.params.name === 'trending') {
        getTrending('tv', this.items.page + 1).then(response => {
          this.items.results = this.items.results.concat(response.results);
          this.items.page = response.page;
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      } else {
        getTvShows(this.$route.params.name, this.items.page + 1).then(response => {
          this.items.results = this.items.results.concat(response.results);
          this.items.page = response.page;
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      }
    }
  }
};
</script>
