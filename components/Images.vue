
<template>
  <div class="spacing">
    <div :class="$style.head">
      <h2 :class="$style.title">
        {{ title }}
      </h2>

      <strong :class="$style.count">
        {{ imagesCount }}
      </strong>
    </div>

    <div :class="$style.items">
      <ImagesItem
        v-for="(image, index) in images"
        :key="`image-${index}`"
        :image="image"
        :index="index"
        :type="type"
        @openModal="openModal" />
    </div>

    <!-- TODO: could be lazy-loaded -->
    <Modal
      v-if="modalVisible"
      :data="images"
      modifier="modal--images"
      aria-label="Images"
      nav
      :start-at="modalStartAt"
      @close="closeModal" />
  </div>
</template>

<script>
import {
  TMDB_IMAGE_URL,
  POSTER_SIZES,
  OTHER_SIZES
} from '~/config/tmdbAPI';
import ImagesItem from '~/components/ImagesItem';
import Modal from '~/components/Modal';
import IMAGE_TYPES from '~/utils/constants/image-types';
import scssVariables from '~/assets/css/utilities/_variables.scss';

export default {
  components: {
    ImagesItem,
    Modal
  },

  props: {
    title: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    images: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      modalVisible: false,
      modalStartAt: 0
    };
  },

  computed: {
    imagesCount() {
      return `${this.images.length} ${this.images.length > 1 ? 'Images' : 'Image'}`;
    }
  },

  created() {
    this.handleData();
  },

  methods: {
    handleData() {
      this.images.forEach(image => {
        image.thumbSrcset =
          `${TMDB_IMAGE_URL}/${POSTER_SIZES.W92}${image.file_path} 92w, ` +
          `${TMDB_IMAGE_URL}/${POSTER_SIZES.W154}${image.file_path} 154w, ` +
          // TODO: 300w is set as a workaround
          `${TMDB_IMAGE_URL}/${POSTER_SIZES.W185}${image.file_path} 300w, ` +
          // `${TMDB_IMAGE_URL}/${LOGO_SIZES.W300}${image.file_path} 300w, ` +
          `${TMDB_IMAGE_URL}/${POSTER_SIZES.W342}${image.file_path} 342w, ` +
          `${TMDB_IMAGE_URL}/${POSTER_SIZES.W500}${image.file_path} 500w, ` +
          `${TMDB_IMAGE_URL}/${POSTER_SIZES.W780}${image.file_path} 780w, ` +
          `${TMDB_IMAGE_URL}/${POSTER_SIZES.ORIGINAL}${image.file_path} 780w`;

        if (this.type === IMAGE_TYPES.BACKDROP) {
          image.thumbSrc = `${TMDB_IMAGE_URL}/${OTHER_SIZES.W533_AND_H300_BESTV2}${image.file_path}`;

          image.thumbSizes =
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

        if (this.type === IMAGE_TYPES.POSTER) {
          image.thumbSrc = `${TMDB_IMAGE_URL}/${OTHER_SIZES.W370_AND_H556_BESTV2}${image.file_path}`;

          image.thumbSizes =
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

        image.src = `${TMDB_IMAGE_URL}/original${image.file_path}`;
      });
    },

    openModal(index) {
      this.modalStartAt = index;
      this.modalVisible = true;
    },

    closeModal() {
      this.modalVisible = false;
      this.modalStartAt = 0;
    }
  }
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.head {
  display: flex;
  align-items: baseline;
  margin-bottom: 1.5rem;

  @media (min-width: $breakpoint-large) {
    margin-bottom: 2rem;
  }
}

.title {
  font-size: 1.8rem;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-large) {
    font-size: 2.4rem;
  }
}

.count {
  margin-left: 1rem;
  font-size: 1.2rem;
  color: $text-color-grey;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-large) {
    font-size: 1.4rem;
  }
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.4rem;
  margin-left: -0.4rem;
}
</style>
