
<template>
  <div
    v-if="people && people.length"
    class="listing listing--carousel">
    <div class="listing__head">
      <h2 class="listing__title">
        Cast
      </h2>
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
        <CreditsItem
          v-for="person in people"
          :key="`credit-${person.id}`"
          :person="person" />
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
import { debounce } from '~/mixins/Functions';
import CreditsItem from '~/components/CreditsItem';
import ChevronLeftIcon from '~/assets/images/chevron-left.svg?inline';
import ChevronRightIcon from '~/assets/images/chevron-right.svg?inline';

export default {
  components: {
    CreditsItem,
    ChevronLeftIcon,
    ChevronRightIcon
  },

  mixins: [carousel],

  props: {
    people: {
      type: Array,
      required: true
    }
  },

  mounted() {
    this.calculateState(this.people.length);
  },

  methods: {
    resizeEvent: debounce(function () {
      this.calculateState(this.people.length);
    }, 100)
  }
};
</script>
