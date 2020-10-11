<template>
  <div class="word-page">
    <Loader v-if="loading" class="card col s12 m6 center" style="height:100%" />
    <div v-else class="row">
      <WordForm
        v-if="changeMod"
        :changeMod="changeMod"
        :propWordCard="wordCard"
        @changeWordCard="changeWordCard"
      />

      <WordCard
        :propWordCard="wordCard"
        :propChangeMod="changeMod"
        :propUser="auth.user ? auth.user : null"
        @changeWordCard="changeWordCard"
        @toggleToFavorite="toggleToFavorite"
      />

      <div v-if="isFounded" class="card" style="height:60vh">
        <h4 class="center">Word not found</h4>
        <div class="buttons another" style="margin-top:4rem">
          <router-link
            to="/"
            class="btn green waves-effect waves-light btn-add center"
            >To Home<i class="material-icons left">arrow_back </i></router-link
          >
          <router-link
            to="/words/add"
            class="btn green waves-effect waves-light btn-add center"
            ><i class="material-icons left">add</i>Add word</router-link
          >
        </div>
      </div>
    </div>
    <div
      class=" buttons"
      v-if="
        !isFounded &&
          !loading &&
          wordCard &&
          auth.user &&
          (isAllowed || auth.user.id === wordCard.userId)
      "
    >
      <button
        v-show="!changeMod"
        type="button"
        style="margin-right:1rem"
        class="btn orange  waves-effect waves-light  "
        @click="changeHandler"
      >
        Change
      </button>
      <button
        type="button"
        style="margin-right:1rem"
        class="btn red  waves-effect waves-light  "
        @click="deleteHandler"
      >
        Delete
      </button>
      <button
        class="btn green  waves-effect waves-light  "
        type="submit"
        @click="updateHandler(false)"
        v-show="changeMod"
      >
        Update
        <i class="material-icons right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid"
import { mapState } from "vuex"
import WordForm from "@/components/WordForm"
import WordCard from "@/components/WordCard"
import checkAccessMixin from "@/mixins/checkAccess.mixin"

export default {
  mixins: [checkAccessMixin("moderator")],
  data: () => ({
    wordCard: null,
    loading: false,
    changeMod: false,
    isFounded: null,
  }),
  computed: {
    ...mapState(["auth"]),
  },
  watch: {
    $route() {
      this.findWord()
    },
  },
  async mounted() {
    this.findWord()
  },
  methods: {
    async findWord() {
      try {
        this.loading = true
        const word = this.$route.params.word
        if (!word) {
          this.$router.push("/")
          this.$message("Invalid route")
        }
        const response = await this.$store.dispatch("findWord", word)
        if (!!response.success) {
          this.wordCard = response.result
        } else {
          this.isFounded = true
        }
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    changeWordCard(newWordCard) {
      this.wordCard = JSON.parse(JSON.stringify(newWordCard))
    },
    async deleteHandler() {
      try {
        const data = { id: this.wordCard._id }
        const result = await this.$store.dispatch("deleteWord", data)
        if (!!result) {
          this.$message("Word deleted")
          this.$router.push("/")
        }
      } catch (e) {}
    },
    changeHandler() {
      this.changeMod = true
      this.$nextTick(() => {
        M.updateTextFields()
      })
    },
    async updateHandler(fromToggleFavorite = false) {
      try {
        const data = {
          data: {
            ...this.wordCard,
            meanings: this.wordCard.meanings.map((m) => {
              return { tags: m.tags, meaning: m.meaning }
            }),
          },
        }
        const result = await this.$store.dispatch("updateWord", data)
        if (!!result.success) {
          if (!fromToggleFavorite) this.$message("Word updated")
          this.$router.push(`/word/${this.wordCard.word}`).catch((e) => e)
          this.changeMod = false
        } else if (!result.success) {
          this.$message("Word already exists")
        }
      } catch (e) {}
    },
    async toggleToFavorite() {
      try {
        if (this.wordCard.favorite.indexOf(this.auth.user.name) > -1) {
          this.wordCard.favorite = this.wordCard.favorite.filter(
            (fav) => fav !== this.auth.user.name
          )
          await this.updateHandler(true)
          this.$message("Word removed from favorite")
        } else {
          this.wordCard.favorite = [
            ...this.wordCard.favorite,
            this.auth.user.name,
          ]
          await this.updateHandler(true)
          this.$message("Word added to favorite")
        }
      } catch (e) {}
    },
  },
  components: { WordForm, WordCard },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.word-page {
  margin-top: 2rem;
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

.card {
  padding: 1rem;
}

@include for-phone-only {
  .buttons {
    display: flex;
    justify-content: safe;
    .btn-add {
      margin-right: 0.1rem;
    }
    .btn-clear {
      margin-left: 0.1rem;
    }
  }
}
</style>
