<template>
  <section>
    <div class="page-title">
      <h3>
        {{ "Profile/ProfileTitle" | localize }}
      </h3>
    </div>

    <div class="row">
      <div class="col s3 sidebar ">
        <div class="collection">
          <a
            class="collection-item"
            :class="{ active: currentSection === 'profile' }"
            @click="currentSection = 'profile'"
            >{{ "Profile/Account" | localize }}</a
          >
          <a
            class="collection-item"
            :class="{ active: currentSection === 'favoriteWords' }"
            @click="currentSection = 'favoriteWords'"
            >{{ "Profile/FavoriteWords" | localize }}</a
          >
          <a
            class="collection-item"
            :class="{ active: currentSection === 'favoriteQuotes' }"
            @click="currentSection = 'favoriteQuotes'"
            >{{ "Profile/FavoriteQuotes" | localize }}</a
          >
          <a
            class="collection-item"
            :class="{ active: currentSection === 'addedWords' }"
            @click="currentSection = 'addedWords'"
            >{{ "Profile/AddedWords" | localize }}</a
          >
          <a
            class="collection-item"
            :class="{ active: currentSection === 'addedQuotes' }"
            @click="currentSection = 'addedQuotes'"
            >{{ "Profile/AddedQuotes" | localize }}</a
          >
          <a
            class="collection-item"
            :class="{ active: currentSection === 'inspiration' }"
            @click="currentSection = 'inspiration'"
            >{{ "Profile/Inspiration" | localize }}</a
          >
        </div>
      </div>
      <div v-if="auth.loading || !auth.isUserLoggedIn" class="col s9 row info">
        <Loader class="center" />
      </div>

      <div v-else class="col s9 row info">
        <div v-if="currentSection === 'profile'" class="profile">
          <div class="col s4 avatar-box">
            <i class="material-icons large">account_circle </i>
          </div>
          <div class="col s8">
            <p>{{ "Profile/ProfileName" | localize }} {{ auth.user.name }}</p>
          </div>
        </div>
        <Loader v-else-if="loading" />
        <ProfileQuotes
          v-else-if="
            (quotes.list && currentSection === 'favoriteQuotes') ||
              currentSection === 'addedQuotes' ||
              currentSection === 'inspiration'
          "
          :propQuotesList="quotes.list"
        />
        <ProfileWords
          v-else-if="
            (wordsList && currentSection === 'favoriteWords') ||
              currentSection === 'addedWords'
          "
          :propWordsList="wordsList"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ProfileQuotes from "@/components/ProfileQuotes"
import ProfileWords from "@/components/ProfileWords"

import { mapState } from "vuex"
export default {
  data: () => ({
    currentSection: "profile",
    loading: false,
    wordsList: [],
  }),
  computed: {
    ...mapState(["auth", "quotes"]),
  },
  watch: {
    currentSection() {
      if (
        this.currentSection === "favoriteQuotes" ||
        this.currentSection === "addedQuotes" ||
        this.currentSection === "inspiration"
      ) {
        this.getQuotes(this.currentSection)
      } else if (
        this.currentSection === "favoriteWords" ||
        this.currentSection === "addedWords"
      ) {
        this.getWords(this.currentSection)
      }
    },
  },
  async mounted() {
    try {
      this.loading = true
      await this.$store.dispatch("getUserInfo")
    } catch (e) {
    } finally {
      this.loading = false
    }
  },
  methods: {
    async getQuotes(section) {
      try {
        this.loading = true
        await this.$store.dispatch(
          "searchQuotes",
          `?user=${this.auth.user.name}${
            section === "favoriteQuotes"
              ? "&favorite=true"
              : section === "inspiration"
              ? "&inspiration=true"
              : "&added=" + this.auth.user.id
          }`
        )
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    async getWords(section) {
      try {
        this.loading = true
        const res = await this.$store.dispatch(
          "searchWords",
          `?user=${this.auth.user.name}${
            section === "favoriteWords"
              ? "&favorite=true"
              : "&added=" + this.auth.user.id
          }`
        )
        if (!!res.success) {
          this.wordsList = res.result
        } else {
          this.wordsList = []
        }
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
  components: {
    ProfileQuotes,
    ProfileWords,
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.3);
}

.info {
  padding: 1rem;
}
.collection-item {
  cursor: pointer;
}
</style>
