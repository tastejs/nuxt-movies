
<template>
  <main class="main">
    <Hero :item="featured" />

    <ListingCarousel
      v-if="popularShown"
      :title="popularTitle"
      :view-all-url="popularUrl"
      :items="popular" />

    <ListingCarousel
      v-if="topRatedShown"
      :title="topRatedTitle"
      :view-all-url="topRatedUrl"
      :items="topRated" />

    <ListingCarousel
      v-if="onAirShown"
      :title="onAirTitle"
      :view-all-url="onAirUrl"
      :items="onAir" />

    <ListingCarousel
      v-if="airingTodayShown"
      :title="airingTodayTitle"
      :view-all-url="airingTodayUrl"
      :items="airingToday" />
  </main>
</template>

<script>
import {
  getTvShows,
  getTvShow,
  getListItem
} from '~/services/tmdbAPI';
import Hero from '~/components/Hero';
import ListingCarousel from '~/components/ListingCarousel';

export default {
  components: {
    Hero,
    ListingCarousel
  },

  async asyncData({ error }) {
    try {
      const popular = await getTvShows('popular');
      const topRated = await getTvShows('top_rated');
      const onAir = await getTvShows('on_the_air');
      const airingToday = await getTvShows('airing_today');
      const featured = await getTvShow(popular.results[0].id);

      return {
        popular,
        topRated,
        onAir,
        airingToday,
        featured
      };
    } catch {
      error({
        statusCode: 504,
        message: 'Data not available'
      });
    }
  },

  head() {
    return {
      title: 'TV Shows',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'TV Shows'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.FRONTEND_URL}${this.$route.path}`
        }
      ]
    };
  },

  computed: {
    popularShown() {
      return this.popular?.results.length;
    },

    popularTitle() {
      return getListItem('tv', 'popular').title;
    },

    popularUrl() {
      return {
        name: 'tv-category-name',
        params: {
          name: 'popular'
        }
      };
    },

    topRatedShown() {
      return this.topRated?.results.length;
    },

    topRatedTitle() {
      return getListItem('tv', 'top_rated').title;
    },

    topRatedUrl() {
      return {
        name: 'tv-category-name',
        params: {
          name: 'top_rated'
        }
      };
    },

    onAirShown() {
      return this.onAir?.results.length;
    },

    onAirTitle() {
      return getListItem('tv', 'on_the_air').title;
    },

    onAirUrl() {
      return {
        name: 'tv-category-name',
        params: {
          name: 'on_the_air'
        }
      };
    },

    airingTodayShown() {
      return this.airingToday?.results.length;
    },

    airingTodayTitle() {
      return getListItem('tv', 'airing_today').title;
    },

    airingTodayUrl() {
      return {
        name: 'tv-category-name',
        params: {
          name: 'airing_today'
        }
      };
    }
  }
};
</script>
