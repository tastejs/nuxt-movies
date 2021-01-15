
<template>
  <div>
    <CookieConsent />
    <InstallPrompt />

    <!-- TODO: `slidedown` is hardcoded -->
    <transition name="slidedown">
      <SearchForm v-if="searchFormOpen" />
    </transition>

    <Nav />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import CookieConsent from '~/components/global/CookieConsent';
import InstallPrompt from '~/components/global/InstallPrompt';
import SearchForm from '~/components/global/SearchForm';
import Nav from '~/components/global/Nav';
import Footer from '~/components/global/Footer';

export default {
  components: {
    CookieConsent,
    InstallPrompt,
    SearchForm,
    Nav,
    Footer
  },
  computed: {
    searchFormOpen() {
      return this.$search.checkSearchFormOpen();
    }
  }
};
</script>
