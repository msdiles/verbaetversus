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
          >
            <i
              class="material-icons right "
              style="font-size:1.5rem;margin-left:0;"
              >arrow_drop_down</i
            ><i
              class="medium material-icons right "
              style="font-size:2.5rem;"
              >account_circle</i
            >
          </a>

          <ul id="dropdown1" class="dropdown-content">
            <li><router-link to="/login">Login</router-link></li>
            <li class="divider"></li>
            <li><router-link to="/register">Register</router-link></li>
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
  #dropdown1 {
    position: absolute;
    top: -55px;
    overflow: visible;
    &:before {
      content: "";
      position: absolute;
      top: -10px;
      right: 15%;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid white;
    }
  }
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
    #dropdown1 {
      top: -50px;
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
