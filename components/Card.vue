
<template>
  <div class="card">
    <nuxt-link
      class="card__link"
      :to="{ name: `${media}-id`, params: { id: item.id } }">
      <div class="card__img">
        <img-transition v-if="poster">
          <nuxt-img
            loading="lazy"
            sizes="xsmall:20vw small:20vw 1500:14vw 1800:12vw 2500:370"
            :alt="name"
            :src="poster" />
        </img-transition>
        <PlaceholderIcon v-else />
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
import { name, stars } from '~/mixins/Details';
import ImgTransition from '~/components/ImgTransition';
import PlaceholderIcon from '~/assets/images/placeholder.svg?inline';

export default {
  components: {
    ImgTransition,
    PlaceholderIcon
  },

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
      return this.item.poster_path || this.item.profile_path;
    },

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
