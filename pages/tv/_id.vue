
<!-- TODO: should use enums for menu options (overview/episodes/videos/photos) -->
<!-- TODO: should use `fetch` Re: https://nuxtjs.org/blog/understanding-how-fetch-works-in-nuxt-2-12 -->
<!-- TODO: could use query parameters for selected active menu to be persisted -->
<!-- TODO: could use nested pages for menu -->

<template>
  <main class="main">
    <!-- TODO: double-check -->
    <TheTopNav :title="metaTitle" />

    <Hero :item="item" />

    <MediaNav
      :menu="menu"
      @clicked="navClicked" />

    <template v-if="activeMenu === 'overview'">
      <TvInfo :item="item" />

      <Credits
        v-if="creditsShown"
        :people="item.credits.cast" />
    </template>

    <template v-if="activeMenu === 'episodes' && episodesShown">
      <Episodes :number-of-seasons="item.number_of_seasons" />
    </template>

    <template v-if="activeMenu === 'videos' && videosShown">
      <Videos :videos="item.videos.results" />
    </template>

    <template v-if="activeMenu === 'photos' && imagesShown">
      <Images
        v-if="item.images.backdrops.length"
        title="Backdrops"
        type="backdrop"
        :images="item.images.backdrops" />

      <Images
        v-if="item.images.posters.length"
        title="Posters"
        type="poster"
        :images="item.images.posters" />
    </template>

    <ListingCarousel
      v-if="recommendedItemsShown"
      title="More Like This"
      :items="recommendedItems" />
  </main>
</template>

<script>
import { getTvShow, getTvShowRecommended } from '~/services/tmdbAPI';
import {
  name,
  yearStart,
  yearEnd
} from '~/mixins/Details';
import TheTopNav from '~/components/TheTopNav';
import Hero from '~/components/Hero';
import MediaNav from '~/components/MediaNav';
import TvInfo from '~/components/tv/TvInfo';
import Videos from '~/components/Videos';
import Images from '~/components/Images';
import Credits from '~/components/Credits';
import Episodes from '~/components/tv/Episodes';
import ListingCarousel from '~/components/ListingCarousel';

export default {
  components: {
    TheTopNav,
    Hero,
    MediaNav,
    TvInfo,
    Videos,
    Images,
    Credits,
    Episodes,
    ListingCarousel
  },

  mixins: [
    name,
    yearStart,
    yearEnd
  ],

  async asyncData({
    params,
    error
  }) {
    try {
      const item = await getTvShow(params.id);

      if (item.adult) {
        error({ message: 'This tv show is not available' });
      } else {
        return { item };
      }
    } catch {
      error({ message: 'Page not found' });
    }
  },

  data() {
    return {
      menu: [],
      activeMenu: 'overview',
      recommendedItems: null
    };
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
          hid: 'og:description',
          property: 'og:description',
          content: this.metaDescription
        },
        {
          hid: 'description',
          name: 'description',
          content: this.metaDescription
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.metaImage
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
      if (this.item.status === 'Ended' && this.yearStart && this.yearEnd) {
        return `${this.name} (TV Series ${this.yearStart}-${this.yearEnd})`;
      } else if (this.yearStart) {
        return `${this.name} (TV Series ${this.yearStart}-)`;
      } else {
        return `${this.name} (TV Series)`;
      }
    },

    metaDescription() {
      if (this.item.overview) {
        return this.truncate(this.item.overview, 200);
      } else {
        return '';
      }
    },

    metaImage() {
      if (!this.item.poster_path) {
        return '';
      }
      return this.$img(this.item.poster_path, { width: 500 });
    },

    creditsShown() {
      const credits = this.item.credits;
      return credits?.cast?.length;
    },

    episodesShown() {
      return this.item.number_of_seasons;
    },

    videosShown() {
      const videos = this.item.videos;
      return videos?.results?.length;
    },

    imagesShown() {
      const images = this.item.images;
      return images?.backdrops?.length || images?.posters?.length;
    },

    recommendedItemsShown() {
      return this.recommendedItems?.results.length;
    }
  },

  created() {
    this.createMenu();
    this.initRecommended();
  },

  methods: {
    truncate(string, length) {
      return this.$options.filters.truncate(string, length);
    },

    createMenu() {
      const menu = [];

      // overview
      menu.push('Overview');

      // episodes
      if (this.episodesShown) {
        menu.push('Episodes');
      }

      // videos
      if (this.videosShown) {
        menu.push('Videos');
      }

      // images
      if (this.imagesShown) {
        menu.push('Photos');
      }

      this.menu = menu;
    },

    navClicked(label) {
      this.activeMenu = label;
    },

    initRecommended() {
      // if recommendedItems don't exist, retrieve them
      if (this.recommendedItems !== null) {
        return;
      }

      getTvShowRecommended(this.$route.params.id).then(response => {
        this.recommendedItems = response;
      });
    }
  }
};
</script>
