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
        @changeWordCard="changeWordCard"
      />
    </div>
    <div class=" buttons">
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
        @click="updateHandler"
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
import WordForm from "@/components/WordForm"
import WordCard from "@/components/WordCard"
export default {
  data: () => ({
    wordCard: null,
    loading: false,
    changeMod: false,
  }),

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
          this.$message("Word not found")
          this.$router.push("/")
        }
      } catch (error) {
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
    async updateHandler() {
      try {
        const data = {
          word: this.wordCard.word,
          id: this.wordCard._id,
          meanings: this.wordCard.meanings.map((m) => {
            return { tags: m.tags, meaning: m.meaning }
          }),
        }
        const result = await this.$store.dispatch("updateWord", data)
        if (!!result.success) {
          this.$message("Word updated")
          this.$router.push(`/word/${this.wordCard.word}`).catch(e=>e)
          this.changeMod = false
        } else if (!result.success) {
          this.$message("Word already exists")
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
