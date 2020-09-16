<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
    <router-link
      to="/"
      class="btn-floating waves-effect waves-light to-home-btn"
      ><i class="material-icons left">arrow_back</i>To home</router-link
    >
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.empty-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 5rem;
  align-items: center;
  .to-home-btn {
    position: absolute;
    top: 4rem;
    left: 4rem;
  }
}

@include for-phone-only {
  .empty-layout {
    .to-home-btn {
      top: 2rem;
      left: 2rem;
    }
  }
}
</style>
