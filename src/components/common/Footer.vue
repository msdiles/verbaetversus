<template>
  <footer class="page-footer blue-grey darken-1">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Footer Content</h5>
          <p class="grey-text text-lighten-4"></p>
        </div>
        <div class="col l4 s12">
          <h5 class="white-text">Links</h5>
          <ul></ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container center">
        © 2020 Copyright
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";
.page-footer {
  position: relative;
  @include for-phone-only {
    width: 100%;
  }

  @include for-desktop-up {
    margin: 0 10%;
    width: 80%;
  }
  @include for-big-desktop-up {
    margin: 0 20%;
    width: 60%;
  }
}
</style>
