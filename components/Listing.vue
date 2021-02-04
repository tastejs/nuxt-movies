
<template>
  <div class="listing">
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

    <div class="listing__items">
      <Card
        v-for="item in items.results"
        :key="`card-${item.id}`"
        :item="item" />
    </div>

    <div
      v-if="items.page < items.total_pages"
      class="listing__nav">
      <LoadingSpinnerIcon v-if="loading" />
    </div>
  </div>
</template>

<script>
import { debounce } from '~/mixins/Functions';
import Card from '~/components/Card';
import LoadingSpinnerIcon from '~/assets/images/loading-spinner.svg?inline';

export default {
  components: {
    Card,
    LoadingSpinnerIcon
  },

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
    },

    show: {
      type: Number,
      required: false,
      default: null
    },

    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  created() {
    // if show exists, limit the results
    if (this.show) {
      // TODO: avoid mutating props
      // eslint-disable-next-line vue/no-mutating-props
      this.items.results = this.items.results.splice(0, this.show);
      // eslint-disable-next-line vue/no-mutating-props
      this.items.total_pages = 1;
      // eslint-disable-next-line vue/no-mutating-props
      this.items.total_results = this.show;
    }
  },

  mounted() {
    window.addEventListener('scroll', this.getScrollPosition);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.getScrollPosition);
  },

  methods: {
    getScrollPosition: debounce(function () {
      if (this.items.page < this.items.total_pages) {
        const bottomOfWindow = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 600;
        if (bottomOfWindow && !this.loading) {
          this.loadMore();
        }
      } else {
        // remove scroll event, no more pages to load
        window.removeEventListener('scroll', this.getScrollPosition);
      }
    }, 50),

    loadMore() {
      this.$emit('loadMore');
    }
  }
};
</script>
