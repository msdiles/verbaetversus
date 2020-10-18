<template>
  <div class="random-word">
    <Loader v-if="loading" class="card col s12 m6 center" style="height:100%" />
    <WordCard
      v-else-if="wordCard"
      :propWordCard="wordCard"
      :propChangeMod="false"
      :propUser="auth.user ? auth.user : null"
      @toggleToFavorite="toggleToFavorite"
    />
    <div class="buttons">
      <button
        type="button"
        style="margin-right:1rem"
        class="btn orange  waves-effect waves-light  "
        @click="refreshHandler"
      >
        {{ "RandomWord/RefreshButton" | localize }}
      </button>
    </div>
  </div>
</template>

<script>
import WordCard from "@/components/WordCard"
import { mapState } from "vuex"
export default {
  data: () => ({
    wordCard: null,
    loading: false,
  }),
  computed: {
    ...mapState(["language", "auth"]),
  },
  async mounted() {
    this.fetchRandomWord()
  },
  methods: {
    async fetchRandomWord() {
      try {
        this.loading = true
        const word = await this.$store.dispatch(
          "searchWords",
          "?number=1&random=true&language=" + this.language
        )
        this.wordCard = word.result
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    refreshHandler() {
      this.fetchRandomWord()
    },
    async toggleToFavorite() {
      try {
        if (this.wordCard.favorite.indexOf(this.auth.user.name) > -1) {
          this.wordCard.favorite = this.wordCard.favorite.filter(
            (fav) => fav !== this.auth.user.name
          )
          await this.updateHandler()
          this.$messageOrange("Word removed from favorite")
        } else {
          this.wordCard.favorite = [
            ...this.wordCard.favorite,
            this.auth.user.name,
          ]
          await this.updateHandler()
          this.$messageGreen("Word added to favorite")
        }
      } catch (e) {}
    },
    async updateHandler() {
      try {
        const data = {
          data: {
            ...this.wordCard,
          },
        }
        const result = await this.$store.dispatch("updateWord", data)
      } catch (e) {}
    },
  },
  components: {
    WordCard,
  },
}
</script>

<style lang="scss" scoped>
.random-word{
  margin-top:2rem;
}

.buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  .btn-add {
    margin-right: 1rem;
  }
  .btn-clear {
    margin-left: 1rem;
  }
}
</style>
