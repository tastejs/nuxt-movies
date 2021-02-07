
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
import { getMediaByGenre, getGenreList } from '~/services/tmdbAPI';
import TheTopNav from '~/components/TheTopNav';
import Listing from '~/components/Listing';

export default {
  components: {
    TheTopNav,
    Listing
  },

  data() {
    return {
      loading: false,
      items: {},
      genre: {}
    };
  },

  async fetch() {
    try {
      const [
        items,
        genres
      ] = await Promise.all([
        getMediaByGenre('movie', this.$nuxt.context.params.id),
        getGenreList('movie')
      ]);
      const genre = genres.find(genre => genre.id === parseInt(this.$nuxt.context.params.id));

      if (genre) {
        this.items = items;
        this.genre = genre;
      } else {
        this.$nuxt.context.error({ message: 'Page not found' });
      }
    } catch {
      this.$nuxt.context.error({
        statusCode: 504,
        message: 'Data not available'
      });
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
      if (this.genre) {
        return `Movie Genre: ${this.genre.name}`;
      } else {
        return 'Movie Genre';
      }
    },

    listingShown() {
      return this.items?.results?.length;
    }
  },

  methods: {
    loadMore() {
      this.loading = true;

      getMediaByGenre('movie', this.$route.params.id, this.items.page + 1).then(response => {
        this.items.results = this.items?.results.concat(response.results);
        this.items.page = response.page;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    }
  }
};
</script>
