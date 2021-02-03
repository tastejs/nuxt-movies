<template>
  <transition v-bind="$attrs" name="fade">
    <slot />
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.75s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
