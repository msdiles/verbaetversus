<template>
  <div class="card quiz-result">
    <div class="card-content" v-if="propChosenWords">
      <div class="card-title center">
        <h4>{{ "QuizContentResult/Title" | localize }}</h4>
        <p>
          <strong>{{ correctAnswers }}</strong
          >{{ "QuizContentResult/CorrectAnswers" | localize }}
          <strong>{{ propChosenWords.length }}</strong>
        </p>
      </div>
      <table>
        <thead></thead>
        <tbody v-for="word in propChosenWords" :key="word.word.word">
          <tr>
            <td>{{ word.word.word | upper }}</td>
            <td v-if="word.corrected">
              <i class="material-icons correct">check</i>
            </td>
            <td v-else><i class="material-icons incorrect">close</i></td>
            <td>
              <router-link :to="`/word/${word.word.word}`" target="_blank">{{
                "QuizContentResult/ToWord" | localize
              }}</router-link>
            </td>
            <td v-if="auth.user" class="add-to-favorite">
              <i
                :key="
                  propWords
                    .filter((w) => w.word === word.word.word)[0]
                    .favorite.indexOf(auth.user.name) !== -1
                "
                class="material-icons"
                :class="{
                  added:
                    propWords
                      .filter((w) => w.word === word.word.word)[0]
                      .favorite.indexOf(auth.user.name) !== -1,
                }"
                @click="favoriteHandler(word)"
                v-tooltip="
                  tooltipSwitch(word)
                    ? `${$options.filters.localize('Favorite/Remove')}`
                    : `${$options.filters.localize('Favorite/Add')}`
                "
                >favorite</i
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  props: {
    propChosenWords: Array,
    propWords: Array,
  },
  computed: {
    ...mapState(["auth"]),
    correctAnswers() {
      return this.propChosenWords.reduce((acc, word) => {
        if (word.corrected) {
          return acc + 1
        } else {
          return acc
        }
      }, 0)
    },
  },
  methods: {
    favoriteHandler(word) {
      const wordCard = this.propWords.filter(
        (w) => w.word === word.word.word
      )[0]
      this.toggleToFavorite(wordCard)
    },
    tooltipSwitch(word) {
      return (
        this.propWords
          .filter((w) => w.word === word.word.word)[0]
          .favorite.indexOf(this.auth.user.name) > -1
      )
    },
    async toggleToFavorite(wordCard) {
      try {
        if (wordCard.favorite.indexOf(this.auth.user.name) > -1) {
          wordCard.favorite = wordCard.favorite.filter(
            (fav) => fav !== this.auth.user.name
          )
          await this.updateHandler(wordCard)
          this.$messageOrange("Word removed from favorite")
        } else {
          wordCard.favorite = [...wordCard.favorite, this.auth.user.name]
          await this.updateHandler(wordCard)
          this.$messageGreen("Word added to favorite")
        }
      } catch (e) {}
    },
    async updateHandler(wordCard) {
      try {
        const data = {
          data: {
            ...wordCard,
          },
        }
        const result = await this.$store.dispatch("updateWord", data)
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss" scoped>
.quiz-result {
  position: relative;
}

.card-title {
  p {
    margin-bottom: 2rem;
  }
}
tr:first-child {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
td {
  padding: 0.5rem 1rem;
}

i.correct {
  color: green;
}
i.incorrect {
  color: red;
}

.add-to-favorite {
  .added {
    color: red;
  }
  opacity: 0.7;
  i:hover {
    opacity: 1;
    transition: 0.2s;
    color: red;
    cursor: pointer;
  }
}
</style>
