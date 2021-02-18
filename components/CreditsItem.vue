
<template>
  <div class="credits-item">
    <nuxt-link
      class="credits-item__link"
      :to="{ name: 'person-id', params: { id: person.id } }">
      <div class="credits-item__img">
        <nuxt-picture
          v-if="poster"
          loading="lazy"
          width="370"
          height="556"
          sizes="xsmall:29vw small:29vw medium:17vw large:14vw xlarge:13vw xlarge1:11vw xlarge2:12vw xlarge3:342"
          :alt="person.name"
          :src="poster" />
        <PlaceholderIcon v-else />
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
import PlaceholderIcon from '~/assets/images/placeholder.svg?inline';

export default {
  components: {
    PlaceholderIcon
  },

  props: {
    person: {
      type: Object,
      required: true
    }
  },

  computed: {
    poster() {
      return this.person.profile_path;
    }
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
  background-color: $secondary-color;
  transition: transform 0.3s ease-in-out;

  img,
  span {
    // TODO: should add styling for span element
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
