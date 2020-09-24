<template>
  <LoaderPage v-if="$route.meta.layout === undefined" />
  <div v-else>
    <component :is="layout"></component>
  </div>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout"
import MainLayout from "@/layouts/MainLayout"
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "main") + "Layout"
    },
  },

  components: {
    AuthLayout,
    MainLayout,
  },
}
</script>

<style lang="scss" scoped>
@import "materialize-css/dist/css/materialize.min.css";
</style>
