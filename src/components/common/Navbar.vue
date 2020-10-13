<template>
  <nav class="navbar  blue-grey darken-1">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo left">Logo</router-link>
      <LocaleDropdown />
      <ul class="right">
        <li>
          <a
            class="dropdown-trigger"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            <i
              class="material-icons right "
              style="font-size:1.5rem;margin-left:0;"
              >arrow_drop_down</i
            ><i class="medium material-icons right " style="font-size:2.5rem;"
              >account_circle</i
            >
          </a>

          <ul v-if="auth.isUserLoggedIn" id="dropdown" class="dropdown-content">
            <li v-if="auth.isUserLoggedIn" class="divider"></li>
            <li>
              <router-link to="/profile">
                {{ "Navbar/Profile" | localize }}</router-link
              >
            </li>
            <li class="divider"></li>
            <li>
              <a href="#" @click.prevent="logout">{{
                "Navbar/Logout" | localize
              }}</a>
            </li>
          </ul>

          <ul v-else id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/login">{{
                "Navbar/Login" | localize
              }}</router-link>
            </li>
            <li class="divider"></li>
            <li>
              <router-link to="/register">{{
                "Navbar/Register" | localize
              }}</router-link>
            </li>
          </ul>
        </li>
      </ul>

      <NavbarSearch />
    </div>
  </nav>
</template>

<script>
import LocaleDropdown from "@/components/LocaleDropdown"
import NavbarSearch from "@/components/NavbarSearch"
import { mapState } from "vuex"

export default {
  data: () => ({ dropdown: null, foundWords: [] }),
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {})
  },
  computed: {
    ...mapState(["auth"]),
  },
  watch: {},
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logOut")
        this.$messageGreen("You Have Been Successfully Logged Out")
      } catch (e) {}
    },
  },
  destroyed() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  components: {
    NavbarSearch,
    LocaleDropdown,
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
  #dropdown {
    position: absolute;
    top: -55px;
    overflow: visible;
    &:before {
      content: "";
      position: absolute;
      top: -10px;
      right: 30%;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid white;
    }
  }
  .dropdown-content{
    width:auto !important;
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
