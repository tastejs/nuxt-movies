
<template>
  <nav :class="$style.nav">
    <button
      type="button"
      aria-label="Go Back"
      :class="$style.button"
      @click="$router.go(-1)">
      <ChevronLeftIcon />
    </button>

    <p :class="$style.text">
      {{ title }}
    </p>
  </nav>
</template>

<script>
import ChevronLeftIcon from '~/assets/images/chevron-left.svg?inline';

export default {
  components: {
    ChevronLeftIcon
  },

  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import '~/assets/css/utilities/_variables.scss';

@media (max-width: $breakpoint-large - 1) {
  .topnav-active {
    padding-top: 4.5rem;
  }
}
</style>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.5rem;
  padding: 0 5.5rem;
  background-color: #000;

  @media (min-width: $breakpoint-large) {
    display: none;
  }
}

.text {
  margin: 0;
  overflow: hidden;
  font-size: 1.4rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.button {
  position: absolute;
  top: 0;
  left: 0;
  width: 4.5rem;
  height: 100%;
  padding: 0;
  margin: 0;
  background: none;
  outline: 0;
  transition: all 0.2s;

  &:hover,
  &:focus {
    opacity: 0.8;
  }
}
</style>
