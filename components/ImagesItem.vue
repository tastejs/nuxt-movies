
<template>
  <div :class="[$style.item, $style[type]]">
    <a
      :href="image.thumbSrc"
      @click.prevent="handleGallery(index)">
      <div :class="$style.image">
        <img-transition v-if="image.thumbSrc">
          <nuxt-img
            loading="lazy"
            :src="image.thumbSrc"
            :width="image.thumbWidth"
            :height="image.thumbHeight" />
        </img-transition>
      </div>
    </a>
  </div>
</template>

<script>
import ImgTransition from '~/components/ImgTransition';

export default {
  components: {
    ImgTransition
  },

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
  background-color: $secondary-color;
}

.backdrop {
  width: 50%;

  @media (min-width: $breakpoint-xsmall) {
    width: 33.3333333%;
  }

  @media (min-width: $breakpoint-medium) {
    width: 25%;
  }

  @media (min-width: 1500px) {
    width: 20%;
  }

  @media (min-width: 1800px) {
    width: 16.6666667%;
  }

  @media (min-width: 2500px) {
    width: 14.2857143%;
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

  @media (min-width: 1500px) {
    width: 16.6666667%;
  }

  @media (min-width: 1800px) {
    width: 14.2857143%;
  }

  @media (min-width: 2500px) {
    width: 12.5%;
  }
}
</style>
