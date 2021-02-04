
<template>
  <div class="listing listing--carousel">
    <div
      v-if="title || viewAllUrl"
      class="listing__head">
      <h2
        v-if="title"
        class="listing__title">
        {{ title }}
      </h2>

      <nuxt-link
        v-if="viewAllUrl"
        :to="viewAllUrl"
        class="listing__explore">
        <strong>Explore All</strong>
      </nuxt-link>
    </div>

    <div class="carousel">
      <button
        class="carousel__nav carousel__nav--left"
        aria-label="Previous"
        type="button"
        :disabled="disableLeftButton"
        @click="moveToClickEvent('left')">
        <ChevronLeftIcon />
      </button>

      <div
        ref="carouselElement"
        class="carousel__items"
        @scroll="scrollEvent">
        <Card
          v-for="item in items.results"
          :key="`card-${item.id}`"
          :item="item" />

        <div
          v-if="viewAllUrl"
          class="card">
          <nuxt-link
            :to="viewAllUrl"
            class="card__link">
            <div class="card__img">
              <span>Explore All</span>
            </div>
          </nuxt-link>
        </div>
      </div>

      <button
        class="carousel__nav carousel__nav--right"
        aria-label="Next"
        type="button"
        :disabled="disableRightButton"
        @click="moveToClickEvent('right')">
        <ChevronRightIcon />
      </button>
    </div>
  </div>
</template>

<script>
import carousel from '~/mixins/Carousel';
import Card from '~/components/Card';
import ChevronLeftIcon from '~/assets/images/chevron-left.svg?inline';
import ChevronRightIcon from '~/assets/images/chevron-right.svg?inline';

export default {
  components: {
    Card,
    ChevronLeftIcon,
    ChevronRightIcon
  },

  mixins: [carousel],

  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },

    viewAllUrl: {
      type: Object,
      required: false,
      default() {
        return null;
      }
    },

    items: {
      type: Object,
      required: true
    }
  },

  mounted() {
    const count = this.viewAllUrl ? this.items.results.length + 1 : this.items.results.length;
    this.calculateState(count);
  },

  methods: {
    resizeEvent() {
      const count = this.viewAllUrl ? this.items.results.length + 1 : this.items.results.length;
      this.calculateState(count);
    }
  }
};
</script>
