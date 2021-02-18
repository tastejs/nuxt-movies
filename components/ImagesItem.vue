
<template>
  <div :class="[$style.item, $style[type]]">
    <a
      :href="image.thumbSrc"
      @click.prevent="handleGallery(index)">
      <div :class="$style.image">
        <nuxt-picture
          loading="lazy"
          :width="image.thumbWidth"
          :height="image.thumbHeight"
          :sizes="image.sizes"
          :src="image.thumbSrc" />
      </div>
    </a>
  </div>
</template>

<script>
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

  @media (min-width: $breakpoint-xlarger1) {
    width: 20%;
  }

  @media (min-width: $breakpoint-xlarger2) {
    width: 16.6666667%;
  }

  @media (min-width: $breakpoint-xlarger3) {
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

  @media (min-width: $breakpoint-xlarger1) {
    width: 16.6666667%;
  }

  @media (min-width: $breakpoint-xlarger2) {
    width: 14.2857143%;
  }

  @media (min-width: $breakpoint-xlarger3) {
    width: 12.5%;
  }
}
</style>
