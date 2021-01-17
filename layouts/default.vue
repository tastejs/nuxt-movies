
<template>
  <div>
    <TheCookieConsent />
    <TheInstallPrompt />

    <!-- TODO: `slidedown` is hardcoded -->
    <transition name="slidedown">
      <TheSearchForm v-if="searchFormOpen" />
    </transition>

    <TheNav />
    <nuxt />
    <TheFooter />
  </div>
</template>

<script>
import TheCookieConsent from '~/components/TheCookieConsent';
import TheInstallPrompt from '~/components/TheInstallPrompt';
import TheSearchForm from '~/components/TheSearchForm';
import TheNav from '~/components/TheNav';
import TheFooter from '~/components/TheFooter';

export default {
  components: {
    TheCookieConsent,
    TheInstallPrompt,
    TheSearchForm,
    TheNav,
    TheFooter
  },
  computed: {
    searchFormOpen() {
      return this.$search.checkSearchFormOpen();
    }
  }
};
</script>
