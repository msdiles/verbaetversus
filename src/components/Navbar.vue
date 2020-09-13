<template>
  <nav class="navbar  blue-grey darken-1">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo left">Logo</router-link>
      <ul class="right">
        <li>
          <a
            class="dropdown-trigger"
            href="#"
            data-target="dropdown1"
            ref="dropdown"
            >Dropdown
            <i class="material-icons right" @click="console.log('click')"
              >arrow_drop_down</i
            >
          </a>
          <ul id="dropdown1" class="dropdown-content">
            <li><a href="#">one</a></li>
            <li><a href="#">two</a></li>
            <li class="divider"></li>
            <li><a href="#">three</a></li>
          </ul>
        </li>
      </ul>
      <NavbarSearch />
    </div>
  </nav>
</template>

<script>
import NavbarSearch from "@/components/NavbarSearch"
export default {
  data: () => ({ dropdown: null }),
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {})
  },

  destroyed() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  components: {
    NavbarSearch,
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.navbar {
  position: absolute;
  top: 0;
  height: 64px;

  z-index: 1000;

  @include for-phone-only {
    left: 0;
    width: 100%;
    height: 54px;
    .dropdown-trigger i {
      z-index: 1;
      position: relative;
    }
    .brand-logo {
      z-index: 1;
    }
  }

  @include for-tablet-portrait-only {
    padding: 0 1rem;
  }

  @include for-tablet-landscape-up {
    padding: 0 2rem;
  }

  @include for-desktop-up {
    left: 10%;
    width: 80%;
  }
  @include for-big-desktop-up {
    left: 20%;
    width: 60%;
  }
}

.nav-wrapper {
  position: relative;
  height: 100%;
}
</style>
