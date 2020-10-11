<template>
  <Loader v-if="loading && chosenWords.length === 0" class="center" />
  <transition-group
    v-else
    tag="div"
    class="transition-slider"
    :name="isBack ? 'slideback' : 'slide'"
  >
    <div
      class="card"
      style="margin-top:0"
      v-for="(word, idx) in chosenWords"
      :key="word.word.word"
      name="change"
      v-show="idx === currentWord"
    >
      <div class="card-content">
        <div class="quiz-element" @click="handleClick($event, word.word)">
          <div class="quiz-question z-depth-2">
            <p>
              What is the meaning of
              <strong>{{ word.word.word | upper }}</strong>
            </p>
          </div>
          <div
            class="quiz-option  waves-effect waves-light"
            v-for="(option, index) in word.options"
            :key="index"
          >
            <p>{{ option | upper }}</p>
          </div>
          <div class="arrow arrow-left" v-show="currentWord > 0">
            <i
              class="material-icons  waves-effect waves-light"
              @click="slideBack"
              >keyboard_arrow_left
            </i>
          </div>
          <div
            class="arrow arrow-right"
            v-show="isCompleted || chosenWords[currentWord].answered"
          >
            <i
              class="material-icons  waves-effect waves-light"
              @click="slideForward"
              >keyboard_arrow_right
            </i>
          </div>
        </div>
      </div>
    </div>
    <QuizContentResult
      v-if="isCompleted && currentWord >= chosenWords.length"
      :key="'result'"
      :propChosenWords="chosenWords"
      :propWords="words"
    />
  </transition-group>
</template>

<script>
import QuizContentResult from "@/components/QuizContentResult"
export default {
  data: () => ({
    words: [],
    chosenWords: [],
    loading: false,
    currentWord: 0,
    isBack: false,
    isCompleted: false,
  }),
  async mounted() {
    try {
      this.loading = true
      const result = await this.$store.dispatch("searchWords", "?number=20")
      if (result.result) {
        this.words = result.result
        this.chosenWords = this.chooseWordForQuiz()
      }
    } catch (e) {
    } finally {
      this.loading = false
    }
  },
  methods: {
    chooseWordForQuiz() {
      return this.words.slice(0, 10).map((w) => ({
        word: w,
        options: [
          ...this.generateOptions(w.word),
          w.meanings[this.generateIndexes(1, 0, w.meanings.length, "")[0]]
            .meaning,
        ].sort(() => Math.random() - 0.5),
        corrected: false,
        answered: false,
      }))
    },
    generateOptions(word) {
      const words = []
      while (words.length < 3) {
        const index = this.generateIndexes(1, 0, this.words.length, word)[0]
        const i = this.generateIndexes(
          1,
          0,
          this.words[index].meanings.length,
          ""
        )[0]
        const w = this.words[index].meanings[i].meaning
        if (words.indexOf(w) < 0) words.push(w)
      }
      return words
    },
    generateIndexes(n, min, max, word) {
      let indexes = []
      while (indexes.length < n) {
        const random =
          max <= 1 ? 0 : Math.floor(Math.random() * (max - min) + min)
        if (indexes.indexOf(random) < 0 && this.words[random].word !== word)
          indexes.push(random)
      }
      return indexes
    },
    handleClick(e, word) {
      const clickedElement = e.target.closest(".quiz-option")

      if (!clickedElement) {
        return
      }

      const isCorrectly = word.meanings.filter((w) => {
        return (
          w.meaning.toLowerCase().trim() ===
          clickedElement
            .querySelector("p")
            .innerHTML.toLowerCase()
            .trim()
        )
      })

      if (isCorrectly.length > 0) {
        clickedElement.classList.add("quiz-correct")
        this.setWordCorrect(word)
      } else {
        clickedElement.classList.add("quiz-incorrect")
        const elements = clickedElement.parentElement.querySelectorAll(
          ".quiz-option"
        )
        Array.from(elements).map((element) => {
          word.meanings.map((w) => {
            if (
              w.meaning.toLowerCase().trim() ===
              element
                .querySelector("p")
                .innerHTML.toLowerCase()
                .trim()
            ) {
              element.classList.add("quiz-correct")
            }
          })
        })
      }
      clickedElement.parentElement.classList.add("quiz-done")
      this.setWordAnswered(word)
      this.checkIsFinished(word)
    },
    setWordCorrect(word) {
      const idx = this.chosenWords.findIndex((w) => w.word.word === word.word)
      this.chosenWords[idx].corrected = true
    },
    setWordAnswered(word) {
      const idx = this.chosenWords.findIndex((w) => w.word.word === word.word)
      this.chosenWords[idx].answered = true
    },
    checkIsFinished(word) {
      const idx = this.chosenWords.findIndex((w) => w.word.word === word.word)
      if (idx === this.chosenWords.length - 1) this.isCompleted = true
    },
    slideBack() {
      this.isBack = true
      this.currentWord--
    },
    slideForward() {
      this.isBack = false
      this.currentWord++
    },
  },
  components: {
    QuizContentResult,
  },
}
</script>

<style lang="scss" scoped>
.card-content {
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}
.quiz-content {
  width: 100%;
  position: relative;
}

.quiz-element {
  display: flex;

  flex-wrap: wrap;
}
.quiz-question {
  margin-bottom: 1rem;
  border: 1px solid rgba($color: #000000, $alpha: 0.2);
  border-radius: 5px;
  flex: 0 0 100%;
  padding: 3rem 1rem;
  text-align: center;
}
.quiz-option {
  flex: 1 1 30%;

  height: 10rem;
  margin: 2rem;
  border: 1px solid rgba($color: #000000, $alpha: 0.3);
  border-radius: 3px;
  padding: 1rem 1rem;
  text-indent: 1rem;
  overflow-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: justify;
  text-align-last: center;
  cursor: pointer;
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 1px 0 rgba(0, 0, 0, 0.12),
      0 2px 1px -1px rgba(0, 0, 0, 0.3);
  }

  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.3);

  p {
    margin: auto;
    width: 100%;
    word-break: break-all;
  }
}

.arrow {
  position: absolute;
  top: 50%;
  transform: scale(2);
  &.arrow-left {
    left: -10%;
  }
  &.arrow-right {
    right: -10%;
  }
  i {
    cursor: pointer;
    border-radius: 50%;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    transition: all 0.1s;
  }
  i:hover {
    background: rgba($color: #000000, $alpha: 0.1);
  }
  i:active {
    background: rgba($color: #000000, $alpha: 0.2);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 1px 0 rgba(0, 0, 0, 0.12),
      0 2px 1px -1px rgba(0, 0, 0, 0.3);
    transition: all 0.1s;
  }
}

.quiz-correct {
  background-color: rgba(16, 209, 16, 0.623);
  &:hover {
    background-color: rgba(16, 209, 16, 0.623);
  }
}

.quiz-incorrect {
  background-color: rgba(255, 0, 0, 0.815);
  &:hover {
    background-color: rgba(255, 0, 0, 0.815);
  }
}

.transition-slider {
  position: relative;
}

.slide-leave-active,
.slide-enter-active {
  transition: all 1s;
  opacity: 1;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
}
.slide-enter {
  opacity: 0;
  position: relative;

  left: 100%;
  right: -100%;
}
.slide-leave-to {
  opacity: 0;
  position: relative;
  left: -100%;
  right: 100%;
}

.slideback-leave-active,
.slideback-enter-active {
  transition: all 1s;
  opacity: 1;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
}
.slideback-enter {
  opacity: 0;
  position: relative;

  left: -100%;
  right: 100%;
}
.slideback-leave-to {
  opacity: 0;
  position: relative;

  left: 100%;
  right: -100%;
}
</style>
