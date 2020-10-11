<template>
  <div class="right locale-dropdown ">
    <a
      v-if="locale"
      class="dropdown-trigger btn btn-small  grey lighten-5 teal-text text-lighten-1"
      data-target="dropdown-locale"
      ref="dropdownLocale"
      >{{ languageProperty[locale] }}</a
    >

    <ul id="dropdown-locale" class="dropdown-content">
      <template v-for="(key, idx) in Object.keys(languageProperty)">
        <li :key="key">
          <a @click="changeLanguage(key)">{{
            languageProperty[key].toUpperCase()
          }}</a>
        </li>
        <li :key="key + idx" class="divider"></li>
      </template>
    </ul>
  </div>
</template>

<script>
import { languageProperty } from "@/filters/localize.filter.js"
import { mapState } from "vuex"
export default {
  data: () => ({
    languageProperty: languageProperty,
  }),
  computed: {
    ...mapState(["locale", "language"]),
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdownLocale, {})
  },
  methods: {
    changeLanguage(locale) {
      this.$store.dispatch("setLanguage", {
        locale,
        language: this.languageProperty[locale],
      })
    },
  },
  beforeDestroy() {
    if (this.dropdown && this.dropdown.destroy) this.dropdown.destroy()
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.dropdown-content {
  min-width: 4rem;
}

@include for-phone-only {
  .locale-dropdown {
    margin-right: 1rem;
    .dropdown-trigger {
      position: relative;
      z-index: 1;
    }
  }
}
</style>
