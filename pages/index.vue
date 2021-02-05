
<template>
  <main class="main">
    <Hero :item="featured" />
    <ListingCarousel
      v-if="trendingMoviesShown"
      :title="trendingMoviesTitle"
      :view-all-url="trendingMoviesUrl"
      :items="trendingMovies" />
    <ListingCarousel
      v-if="trendingTvShown"
      :title="trendingTvTitle"
      :view-all-url="trendingTvUrl"
      :items="trendingTv" />
  </main>
</template>

<script>
import {
  getTrending,
  getMovie,
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

  data() {
    return {
      trendingMovies: {},
      trendingTv: {},
      featured: {}
    };
  },

  async fetch() {
    try {
      this.trendingMovies = await getTrending('movie');
      this.trendingTv = await getTrending('tv');

      // feature a random item from movies or tv
      const items = [
        ...this.trendingMovies.results,
        ...this.trendingTv.results
      ];
      const randomItem = items[Math.floor(Math.random() * items.length)];
      const media = randomItem.title ? 'movie' : 'tv';

      if (media === 'movie') {
        this.featured = await getMovie(randomItem.id);
      } else {
        this.featured = await getTvShow(randomItem.id);
      }
    } catch {
      this.$nuxt.context.error({
        statusCode: 504,
        message: 'Data not available'
      });
    }
  },

  computed: {
    trendingMoviesShown() {
      return this.trendingMovies?.results?.length;
    },

    trendingMoviesTitle() {
      return getListItem('movie', 'trending').title;
    },

    trendingMoviesUrl() {
      return {
        name: 'movie-category-name',
        params: {
          name: 'trending'
        }
      };
    },

    trendingTvShown() {
      return this.trendingTv?.results?.length;
    },

    trendingTvTitle() {
      return getListItem('tv', 'trending').title;
    },

    trendingTvUrl() {
      return {
        name: 'tv-category-name',
        params: {
          name: 'trending'
        }
      };
    }
  }
};
</script>
