
<template>
  <div :class="$style.item">
    <div :class="$style.image">
      <nuxt-picture
        v-if="poster"
        loading="lazy"
        width="400"
        height="225"
        sizes="xsmall:93vw small:46vw medium:45vw large:30vw xlarge:28vw xlarge1:21vw xlarge3:780"
        :alt="episode.name"
        :src="poster" />
      <PlaceholderIcon v-else />
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
import PlaceholderIcon from '~/assets/images/placeholder.svg?inline';

export default {
  components: {
    PlaceholderIcon
  },

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
  background-color: $secondary-color;

  // TODO: should add styling for span element

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
