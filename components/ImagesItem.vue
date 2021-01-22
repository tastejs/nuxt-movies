
<template>
  <div :class="[$style.item, $style[type]]">
    <a
      :href="image.thumb"
      @click.prevent="handleGallery(index)">
      <div :class="$style.image">
        <img
          loading="lazy"
          :src="image.thumb"
          :srcset="imageThumbSrcset(type)"
          :sizes="imageThumbSizes(type)"
          alt="">
      </div>
    </a>
  </div>
</template>

<script>
import {
  POSTER_SIZES,
  OTHER_SIZES
} from '~/config/tmdbAPI';
import scssVariables from '~/assets/css/utilities/_variables.scss';

const IMAGE_TYPES = Object.freeze({
  POSTER: 'poster',
  BACKDROP: 'backdrop'
});

export default {
  props: {
    image: {
      type: Object,
      required: true
    },

    index: {
      type: Number,
      required: true
    },

    type: {
      type: String,
      required: true
    }
  },

  methods: {
    handleGallery(index) {
      this.$emit('openModal', index);
    },

    imageThumbSrcset(imageType) {
      // TODO: should be like the following
      // const srcset =
      //   `${TMDB_IMAGE_URL}/${POSTER_SIZES.W92}${this.image.thumb} 92w, ` +
      //   `${TMDB_IMAGE_URL}/${POSTER_SIZES.W154}${this.image.thumb} 154w, ` +
      //   // TODO: 300w is set as a workaround
      //   `${TMDB_IMAGE_URL}/${POSTER_SIZES.W185}${this.image.thumb} 300w, ` +
      //   // `${TMDB_IMAGE_URL}/${LOGO_SIZES.W300}${this.image.thumb} 300w, ` +
      //   `${TMDB_IMAGE_URL}/${POSTER_SIZES.W342}${this.image.thumb} 342w, ` +
      //   `${TMDB_IMAGE_URL}/${POSTER_SIZES.W500}${this.image.thumb} 500w, ` +
      //   `${TMDB_IMAGE_URL}/${POSTER_SIZES.W780}${this.image.thumb} 780w, ` +
      //   `${TMDB_IMAGE_URL}/${POSTER_SIZES.ORIGINAL}${this.image.thumb} 780w`;

      let defaultSize;

      if (imageType === IMAGE_TYPES.BACKDROP) {
        defaultSize = OTHER_SIZES.W533_AND_H300_BESTV2;
      }

      if (imageType === IMAGE_TYPES.POSTER) {
        defaultSize = OTHER_SIZES.W370_AND_H556_BESTV2;
      }

      const srcset =
          `${this.image.thumb.replace(defaultSize, POSTER_SIZES.W92)} 92w, ` +
          `${this.image.thumb.replace(defaultSize, POSTER_SIZES.W154)} 154w, ` +
          // TODO: 300w is set as a workaround
          `${this.image.thumb.replace(defaultSize, POSTER_SIZES.W185)} 300w, ` +
          // `${this.image.thumb.replace(defaultSize, POSTER_SIZES.W300)} 300w, ` +
          `${this.image.thumb.replace(defaultSize, POSTER_SIZES.W342)} 342w, ` +
          `${this.image.thumb.replace(defaultSize, POSTER_SIZES.W500)} 500w, ` +
          `${this.image.thumb.replace(defaultSize, POSTER_SIZES.W780)} 780w, ` +
          `${this.image.thumb.replace(defaultSize, POSTER_SIZES.ORIGINAL)} 780w`;

      if (!srcset) {
        throw new Error('Invalid sizes!');
      }

      return srcset;
    },

    imageThumbSizes(imageType) {
      let sizes;

      if (imageType === IMAGE_TYPES.BACKDROP) {
        sizes =
          // TODO: 1.5rem (side margin) and 0.4rem (side padding) are hardcoded
          `calc(0.5 * (100vw - 2 * 1.5rem) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointXsmall}) ` +
          `calc(0.333333333 * (100vw - 2 * 1.5rem) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointSmall}) ` +
          `calc(0.333333333 * (100vw - 2 * 4rem) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointMedium}) ` +
          `calc(0.25 * (100vw - 2 * 4rem) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointLarge}) ` +
          `calc(0.25 * (100vw - 2 * 5rem - ${scssVariables.layoutNavWidth}) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointXlarger1}) ` +
          `calc(0.2 * (100vw - 2 * 5rem - ${scssVariables.layoutNavWidth}) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointXlarger2}) ` +
          `calc(0.166666667 * (100vw - 2 * 5rem - ${scssVariables.layoutNavWidth}) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointXlarger3}) ` +
          `calc(0.142857143 * (100vw - 2 * 5rem - ${scssVariables.layoutNavWidth}) - 2 * 0.4rem)`;
      }

      if (imageType === IMAGE_TYPES.POSTER) {
        sizes =
          `calc(0.333333333 * (100vw - 2 * 1.5rem) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointXsmall}) ` +
          `calc(0.25 * (100vw - 2 * 1.5rem) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointSmall}) ` +
          `calc(0.25 * (100vw - 2 * 4rem) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointMedium}) ` +
          `calc(0.2 * (100vw - 2 * 4rem) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointLarge}) ` +
          `calc(0.2 * (100vw - 2 * 5rem - ${scssVariables.layoutNavWidth}) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointXlarger1}) ` +
          `calc(0.166666667 * (100vw - 2 * 5rem - ${scssVariables.layoutNavWidth}) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointXlarger2}) ` +
          `calc(0.142857143 * (100vw - 2 * 5rem - ${scssVariables.layoutNavWidth}) - 2 * 0.4rem), ` +
          `(min-width: ${scssVariables.breakpointXlarger3}) ` +
          `calc(0.125 * (100vw - 2 * 5rem - ${scssVariables.layoutNavWidth}) - 2 * 0.4rem)`;
      }

      if (!sizes) {
        throw new Error('Invalid sizes!');
      }

      return sizes;
    }
  }
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.item {
  padding: 0.4rem;
}

.image {
  position: relative;
  height: 0;
  overflow: hidden;
  background-color: $secondary-color;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.backdrop {
  width: 50%;

  @media (min-width: $breakpoint-xsmall) {
    width: 33.3333333%;
  }

  @media (min-width: $breakpoint-medium) {
    width: 25%;
  }

  @media (min-width: $breakpoint-xlarger1) {
    width: 20%;
  }

  @media (min-width: $breakpoint-xlarger2) {
    width: 16.6666667%;
  }

  @media (min-width: $breakpoint-xlarger3) {
    width: 14.2857143%;
  }

  .image {
    padding-top: 56.28%;
  }
}

.poster {
  width: 33.3333333%;

  @media (min-width: $breakpoint-xsmall) {
    width: 25%;
  }

  @media (min-width: $breakpoint-medium) {
    width: 20%;
  }

  @media (min-width: $breakpoint-xlarger1) {
    width: 16.6666667%;
  }

  @media (min-width: $breakpoint-xlarger2) {
    width: 14.2857143%;
  }

  @media (min-width: $breakpoint-xlarger3) {
    width: 12.5%;
  }

  .image {
    padding-top: 150.27%;
  }
}
</style>
