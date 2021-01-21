
<template>
  <div class="credits-item">
    <nuxt-link
      class="credits-item__link"
      :to="{ name: 'person-id', params: { id: person.id } }">
      <div class="credits-item__img">
        <!-- ray test touch < -->
        <img
          v-if="posterSrc"
          loading="lazy"
          :src="posterSrc"
          :srcset="posterSrcset"
          :sizes="posterSizes"
          :alt="person.name">
        <!-- <img
          v-if="posterSrc"
          v-lazyload="posterSrc"
          class="lazyload"
          :alt="person.name"> -->
        <!-- ray test touch > -->
        <span v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="#999">
            <!-- eslint-disable-next-line -->
            <path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" />
          </svg>
        </span>
      </div>

      <h2 class="credits-item__name">
        {{ person.name }}
      </h2>

      <div class="credits-item__character">
        {{ person.character }}
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import {
  TMDB_IMAGE_URL,
  POSTER_SIZES
} from '~/config/tmdbAPI';
import scssVariables from '~/assets/css/utilities/_variables.scss';

export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  },

  computed: {
    posterSrc() {
      if (this.person.profile_path) {
        // ray test touch <
        return `${TMDB_IMAGE_URL}/${POSTER_SIZES.W342}${this.person.profile_path}`;
        // ray test touch >
      } else {
        return null;
      }
    },

    // ray test touch <
    // TODO: should not duplicate
    posterSrcset() {
      const srcset =
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.W92}${this.person.profile_path} 92w, ` +
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.W154}${this.person.profile_path} 154w, ` +
        // TODO: 300w is set as a workaround
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.W185}${this.person.profile_path} 300w, ` +
        // `${TMDB_IMAGE_URL}/${LOGO_SIZES.W300}${this.person.profile_path} 300w, ` +
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.W342}${this.person.profile_path} 342w, ` +
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.W500}${this.person.profile_path} 500w, ` +
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.W780}${this.person.profile_path} 780w, ` +
        `${TMDB_IMAGE_URL}/${POSTER_SIZES.ORIGINAL}${this.person.profile_path} 780w`;

      return srcset;
    },

    posterSizes() {
      // TODO: `930px`, `1130px`, and `1450px` are hardcoded
      const sizes =
        `calc(0.33333 * (100vw - 22px) - 8px), ` +
        `(min-width: ${scssVariables.breakpointSmall}) ` +
        `calc(.25 * (100vw - 72px) - 8px), ` +
        `(min-width: 930px) ` +
        `calc(.2 * (100vw - 72px) - 8px), ` +
        `(min-width: 1130px) ` +
        `calc(.16667 * (100vw - 72px) - 8px), ` +
        `(min-width: ${scssVariables.breakpointLarge}) ` +
        `calc(.16667 * (100vw - 92px - ${scssVariables.layoutNavWidth}) - 8px), ` +
        `(min-width: 1450px) ` +
        `calc(.14286 * (100vw - 92px - ${scssVariables.layoutNavWidth}) - 8px)`;

      return sizes;
    }
    // ray test touch >
  }
};
</script>

<style lang="scss">
@import '~/assets/css/utilities/_variables.scss';

.credits-item {
  margin-bottom: 2rem;
  line-height: $base-line-height;
}

.credits-item__img {
  position: relative;
  height: 0;
  padding-top: 150.27%;
  overflow: hidden;
  background-color: $secondary-color;
  transition: transform 0.3s ease-in-out;

  img,
  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(0.97);
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.lazyloaded img {
    transform: scale(1);
  }
}

.credits-item__link:hover,
.credits-item__link:focus {
  .credits-item__img {
    transform: scale(1.02);
  }
}

.credits-item__name {
  margin-top: 1rem;
  font-size: 1.3rem;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-large) {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
}

.credits-item__character {
  font-size: 1.2rem;
  color: $text-color-grey;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-large) {
    font-size: 1.4rem;
  }
}
</style>
