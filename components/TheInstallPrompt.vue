<template>
  <div
    v-if="isOpen"
    :class="$style['the-install-prompt']"
    class="alert alert--default">
    <p>Do you want to <a href="#" @click.prevent="install">add this app to your home screen?</a></p>

    <button
      class="alert__close"
      type="button"
      aria-label="Close"
      @click="close">
      <CrossIcon />
    </button>
  </div>
</template>

<script>
import { get, set } from 'tiny-cookie';
import { supportsLocalStorage } from '~/mixins/Functions';
import CrossIcon from '~/assets/images/cross.svg?inline';

let installEvent;

export default {
  components: {
    CrossIcon
  },

  data() {
    return {
      isOpen: false,
      storageName: 'installprompt'
    };
  },

  mounted() {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();

      if (!this.getVisited()) {
        installEvent = event;
        this.isOpen = true;
      }
    });
  },

  methods: {
    setVisited() {
      if (supportsLocalStorage()) {
        localStorage.setItem(this.storageName, true);
      } else {
        set(this.storageName, true);
      }
    },

    getVisited() {
      if (supportsLocalStorage()) {
        return localStorage.getItem(this.storageName);
      } else {
        return get(this.storageName);
      }
    },

    close() {
      this.setVisited();
      this.isOpen = false;
      installEvent = null;
    },

    install() {
      this.isOpen = false;
      installEvent.prompt();

      installEvent.userChoice.then(choice => {
        if (choice.outcome !== 'accepted') {
          this.setVisited();
        }

        installEvent = null;
      });
    }
  }
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.the-install-prompt {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: $z-index-snack-bar;
}
</style>
