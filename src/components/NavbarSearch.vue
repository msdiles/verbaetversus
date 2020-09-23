<template>
  <form>
    <div class="input-field nav-search">
      <input
        @blur="blurHandler"
        @focus="focusHandler"
        id="search"
        type="search"
        required
        autocomplete="off"
        v-model="search"
        :class="{ 'input-active': search }"
      />
      <label class="label-icon" for="search" ref="search"
        ><i class="material-icons">search</i></label
      >
      <i class="material-icons">close</i>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    search: "",
  }),
  methods: {
    focusHandler(e) {
      e.target.style.opacity = 1
      e.target.style.zIndex = "2"
    },
    blurHandler(e) {
      e.target.style.opacity = 0
      e.target.style.zIndex = "-2"
      this.$refs.search.classList.remove("active")
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.input-active {
  background-color: white !important;
  color: #444;
  box-shadow: none;
  border: 0;
}

form {
  position: relative;

  @include for-phone-only {
    width: 100%;
    .nav-search {
      input {
        position: absolute;
        z-index: -2;
      }
      label {
        position: absolute;
        left: 30% !important;
      }
      & > i {
        z-index: -2;
      }
      label.active {
        display: none;
      }
      input ~ label.active {
        z-index: 2;
      }
      label.active ~ i {
        z-index: 2;
      }
    }
  }
  @include for-tablet-portrait-only {
    left: 20%;
    width: 60%;
  }
  @include for-tablet-landscape-up {
    left: 15%;
    width: 70%;
  }

  @include for-big-desktop-up {
    left: 20%;
    width: 60%;
  }
}
</style>
