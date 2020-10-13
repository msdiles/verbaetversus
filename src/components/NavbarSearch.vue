<template>
  <div
    class="navbar-search"
    @mouseover="mouseOver"
    @mouseout="mouseOut"
    ref="navbar"
  >
    <form ref="form" @submit.prevent>
      <div class="input-field nav-search">
        <input
          id="search"
          type="search"
          required
          autocomplete="off"
          v-model="search"
          :class="{ 'input-active': search }"
          ref="input"
          @click="showWords = true"
          @blur="blurHandlerGeneral"
          @focus="focusHandlerGeneral"
        />
        <label class="label-icon" for="search" ref="search"
          ><i class="material-icons">search</i></label
        >
        <i class="material-icons" @click="close" ref="close">close</i>
      </div>
    </form>

    <div
      class="progress  blue lighten-4"
      style="margin:0; width:100%;position:absolute;z-index:-1;"
      v-visible="loading"
    >
      <div class="indeterminate blue"></div>
    </div>
    <div
      v-if="foundWords.length && showWords && search"
      class="list-of-words"
      ref="words"
    >
      <router-link
        v-for="(word, index) in foundWords"
        :key="word._id"
        class="word-field"
        tabIndex="0"
        :to="`/word/${word.word}`"
      >
        <p>{{ index + 1 }}.</p>
        <p class="word-title">{{ word.word }}</p>
        <div class="word-meanings">
          <p>
            <span
              v-for="(meaning, idx) in word.meanings.slice(0, 2)"
              :key="meaning.id"
              class="truncate"
            >
              {{ idx + 1 }}. {{ meaning.meaning }}</span
            >
            <span
              v-for="meaning in word.meanings.slice(2, 3)"
              :key="meaning.id"
              class="truncate"
              style="font-style:italic;"
              >{{ meaning.meaning }}</span
            >
          </p>
        </div>
      </router-link>
    </div>
    <div v-else-if="fetched && showWords && search" class="list-of-words">
      <div
        class="word-field"
        style="height:2.5rem;align-items:center;z-index:100"
      >
        <p style="width:40%;text-align:center;">
          {{ "NavbarSearch/NoResultFound" | localize }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { fromEvent } from "rxjs"
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators"
import { v4 as uuidv4 } from "uuid"

export default {
  data: () => ({
    search: "",
    foundWords: [],
    showWords: false,
    fetched: false,
    loading: false,
  }),
  watch: {
    showWords() {
      if (!this.showWords) this.blurHandlerGeneral()
    },
  },
  mounted() {
    this.search$ = fromEvent(this.$refs.form, "input")
      .pipe(
        map((e) => {
          e.preventDefault()
          return this.search
        }),
        debounceTime(1000)
      )
      .subscribe((str) => str && this.searchWord("?word=" + str + "&number=10"))

    this.blur$ = fromEvent(document, "click")
      .pipe(
        map((e) => {
          return (
            (e.target.contains(this.$refs.words) ||
              e.target.contains(this.$refs.input)) &&
            !e.target.contains(this.$refs.navbar)
          )
        })
      )
      .subscribe((x) => {
        if (!x) this.showWords = false
      })
  },
  methods: {
    focusHandlerGeneral() {
      this.$refs.input.style.opacity = 1
      this.$refs.input.style.zIndex = "2"
      this.$refs.close.style.zIndex = "3000"
    },
    blurHandlerGeneral() {
      if (!this.showWords) {
        this.$refs.input.style.opacity = 0
        this.$refs.input.style.zIndex = "-2"
        this.$refs.close.style.zIndex = "0"

        this.$refs.search.classList.remove("active")
      }
    },
    mouseOver(e) {
      if (e.target.closest("a")) e.target.closest("a").focus()
    },
    mouseOut(e) {
      if (e.target === this.$refs.close) this.close()

      if (e.target.closest("a")) e.target.closest("a").blur()
    },
    close() {
      this.search = ""
      this.foundWords = []
      this.blurHandlerGeneral()
      this.fetched = false
    },
    async searchWord(word) {
      try {
        this.loading = true
        const response = await this.$store.dispatch("searchWords", word)
        if (!!response.success) {
          this.foundWords = response.result.map((w) => {
            return {
              ...w,
              meanings: w.meanings
                .map((meaning, i, arr) => {
                  if (i < 2) return meaning
                  return {
                    meaning: `+ ${arr.length - 2} meanings`,
                    _id: uuidv4(),
                  }
                })
                .filter((meaning, i) => i < 3),
            }
          })
        } else {
          this.foundWords = []
        }
        this.fetched = true
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
  beforeDestroy() {
    this.blur$.unsubscribe()
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.navbar-search {
  height: 100%;

  .list-of-words {
    border: 1px solid #ccc;
    width: 60%;
    left: 20%;
    position: relative;
    background: #fff;
    @include for-phone-only {
      width: 100%;
      position: absolute;
      left: 0% !important;
    }
    @include for-tablet-landscape-up {
      width: 70%;
      position: absolute;
      left: 15% !important;
    }
    @include for-big-desktop-up {
      width: 60%;
      position: absolute;
      left: 20% !important;
    }
    .word-field {
      box-sizing: content-box;
      padding: 0.5rem;
      display: flex;
      justify-content: center;
      p {
        display: block;
        color: #000;
        margin: 0;
        line-height: 1.5rem;
        padding: 0.1rem;
      }
      & > p:nth-child(1) {
        width: 5%;
      }
      .word-title {
        padding: 0 1rem;
        margin: 0 0.5rem;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        width: 20%;
      }
      .word-meanings {
        width: 50%;
      }
      border-bottom: 1px solid #ccc;

      a:hover,
      a:focus {
        background-color: darken($color: #ccc, $amount: 5%);
      }
    }
  }
}

.input-active {
  background-color: white !important;
  color: #444;
  box-shadow: none;
  border: 0;
}

form {
  position: relative;

  @include for-phone-only {
    width: 100%;
    .nav-search {
      input {
        position: absolute;
        z-index: -2;
      }
      label {
        position: absolute;
        left: 30% !important;
      }
      & > i {
        z-index: -2;
      }
      label.active {
        display: none;
      }
      input ~ label.active {
        z-index: 2;
      }
      label.active ~ i {
        z-index: 2;
      }
    }
  }
  @include for-tablet-portrait-only {
    left: 20%;
    width: 60%;
  }
  @include for-tablet-landscape-up {
    left: 15%;
    width: 70%;
  }

  @include for-big-desktop-up {
    left: 20%;
    width: 60%;
  }
}
</style>
