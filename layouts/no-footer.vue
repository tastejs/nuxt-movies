
<template>
  <div>
    <TheNav />
    <nuxt
      keep-alive
      :keep-alive-props="{ max: 10 }" />
  </div>
</template>

<script>
import TheNav from '~/components/TheNav';

export default {
  components: {
    TheNav
  }
};
</script>
