<template>
  <div class="error-page">
    <p>404</p>
    <h3>{{"Error/Title" |localize}}</h3>
    <p>{{"Error/Message" |localize}}</p>
    <router-link class="btn" to="/">{{"Error/ButtonToHome" |localize}}</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";
.error-page {
  display: flex;
  flex-direction: column;

  align-items: center;
  margin: 20% 0;
  p:nth-child(1) {
    font-size: 4rem;
    margin: 0;
    color:red;
  }
  @include for-phone-only {
    h3 {
      font-size: 2rem;
    }

    p:nth-child(3) {
      font-size: 0.8rem;
    }
  }
}
</style>
