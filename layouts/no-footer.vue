
<template>
  <div>
    <TheNav />
    <nuxt
      :key="$route.params.name"
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
