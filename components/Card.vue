
<template>
  <div class="card">
    <nuxt-link
      class="card__link"
      :to="{ name: `${media}-id`, params: { id: item.id } }">
      <div class="card__img">
        <!-- ray test touch < -->
        <img
          src=""
          :srcset="posterSrcset"
          :sizes="posterSizes"
          :alt="name">

        <!-- eslint-disable-next-line -->
        <!-- <img
          v-if="poster"
          v-lazyload="poster"
          class="lazyload"
          :alt="name">
        <span v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="#999">
            <path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" />
          </svg>
        </span> -->
        <!-- ray test touch > -->
      </div>

      <h2 class="card__name">
        {{ name }}
      </h2>

      <div
        v-if="media !== 'person' && (stars || item.vote_average)"
        class="card__rating">
        <div
          v-if="stars"
          class="card__stars">
          <div :style="{ width: `${stars}%` }" />
        </div>

        <div
          v-if="item.vote_average"
          class="card__vote">
          {{ item.vote_average | rating }}
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import {
  TMDB_IMAGE_URL,
  POSTER_SIZES,
  LOGO_SIZES
} from '~/config/tmdbAPI';
import { name, stars } from '~/mixins/Details';
// ray test touch <
import scssVariables from '~/assets/css/utilities/_variables.scss';
// ray test touch >

export default {
  mixins: [
    name,
    stars
  ],

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    poster() {
      if (this.item.poster_path) {
        // ray test touch <
        return `${TMDB_IMAGE_URL}/${POSTER_SIZES.W342}${this.item.poster_path}`;
        // ray test touch >
      } else if (this.item.profile_path) {
        return `${TMDB_IMAGE_URL}/w370_and_h556_bestv2${this.item.profile_path}`;
      } else {
        return false;
      }
    },

    // ray test touch <
    posterSrcset() {
      const srcset =
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.W92}${this.item.poster_path} 92w, ` +
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.W154}${this.item.poster_path} 154w, ` +
        // TODO: 3x is added as a workaround
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.W185}${this.item.poster_path} 3x, ` +
        `${TMDB_IMAGE_URL}/${LOGO_SIZES.W300}${this.item.poster_path} 300w, ` +
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.W342}${this.item.poster_path} 342w, ` +
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.W500}${this.item.poster_path} 500w, ` +
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.W780}${this.item.poster_path} 780w, ` +
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.ORIGINAL}${this.item.poster_path} 780w`;

      return srcset;
    },

    posterSizes() {
      const sizes =
        `calc(0.33333 * (100vw - 22px) - 8px), ` +
        `(min-width: ${scssVariables.breakpointXsmall}) calc(.25 * (100vw - 72px) - 8px), ` +
        `(min-width: ${scssVariables.breakpointMedium}) calc(.2 * (100vw - 72px) - 8px), ` +
        `(min-width: ${scssVariables.breakpointLarge}) calc(.2 * (100vw - 92px) - 8px), ` +
        `(min-width: ${scssVariables.breakpointXlarger1}) calc(.16667 * (100vw - 92px) - 8px), ` +
        `(min-width: ${scssVariables.breakpointXlarger2}) calc(.14286 * (100vw - 92px) - 8px), ` +
        `(min-width: ${scssVariables.breakpointXlarger3}) calc(.125 * (100vw - 92px) - 8px)`;

      return sizes;
    },
    // ray test touch >

    // TODO: `tv` and `movie` are hardcoded
    media() {
      if (this.item.media_type) {
        return this.item.media_type;
      } else if (this.item.name) {
        return 'tv';
      } else {
        return 'movie';
      }
    }
  }
};
</script>
