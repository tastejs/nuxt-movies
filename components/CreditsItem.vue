
<template>
  <div class="credits-item">
    <nuxt-link
      class="credits-item__link"
      :to="{ name: 'person-id', params: { id: person.id } }">
      <div class="credits-item__img">
        <img-transition v-if="poster">
          <nuxt-img
            loading="lazy"
            width="370"
            height="556"
            responsive
            :alt="person.name"
            :src="poster" />
        </img-transition>

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
import ImgTransition from '~/components/ImgTransition';

export default {
  components: {
    ImgTransition
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
