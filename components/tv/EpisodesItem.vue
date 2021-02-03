
<template>
  <div :class="$style.item">
    <div :class="$style.image">
      <nuxt-img
        v-if="poster"
        loading="lazy"
        width="400"
        responsive
        :src="poster"
        :alt="episode.name" />

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

    <h2 :class="$style.name">
      <strong>E{{ episode.episode_number | numberWithDoubleDigits }}</strong> {{ episode.name }}
    </h2>

    <div :class="$style.overview">
      {{ episode.overview | truncate(300) }}
    </div>

    <div
      v-if="episode.air_date"
      :class="$style.aired">
      {{ episode.air_date | fullDate }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    episode: {
      type: Object,
      required: true
    }
  },

  computed: {
    poster() {
      return this.episode.still_path;
    }
  }
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.item {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.4rem;
  margin-bottom: 2rem;

  @media (min-width: $breakpoint-xsmall) {
    width: 50%;
  }

  @media (min-width: $breakpoint-medium) {
    width: 33.3333333%;
  }

  @media (min-width: 1450px) {
    width: 25%;
  }

  @media (min-width: 2000px) {
    width: 20%;
  }

  @media (min-width: 3000px) {
    width: 16.6666667%;
  }
}

.image {
  position: relative;
  height: 0;
  padding-top: 56.25%;
  margin-bottom: 1.5rem;
  overflow: hidden;
  background-color: $secondary-color;

  img,
  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.name {
  margin-bottom: 1rem;
  font-size: 1.6rem;
  letter-spacing: $letter-spacing;

  strong {
    color: $primary-color;
  }
}

.overview {
  flex: 1 0 auto;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: $text-color;
}

.aired {
  font-size: 1.2rem;
  color: $text-color-grey;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-large) {
    font-size: 1.4rem;
  }
}
</style>
