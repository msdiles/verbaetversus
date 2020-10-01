<template>
  <div class="row">
    <form class="col s12" form="form">
      <div class="row">
        <div class="input-field textarea col s12">
          <textarea
            id="quote"
            class="materialize-textarea"
            v-model.trim="quote"
            ref="textarea"
          ></textarea>
          <label for="quote">Enter Quote or Saying</label>
        </div>

        <div class="input-field col s11 offset-s1 m6 offset-m6 author">
          <i class="material-icons">remove</i>
          <input id="last_name" type="text" class="validate" v-model="author" />
          <label for="last_name">Author</label>
        </div>

        <div class="col s12 chips" ref="chipsWords">
          <input class="input" />
        </div>
        <div class="col s12 chips " ref="chipsTags">
          <input class="input" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: { propQuoteCard: Object },
  data: () => ({
    quote: "",
    author: "",
  }),
  computed: {
    quoteCard() {
      return JSON.parse(JSON.stringify(this.propQuoteCard))
    },
  },
  watch: {
    quote() {
      this.quoteCard.quote = this.quote
      this.$emit("changeQuoteCard", this.quoteCard)
    },
    author() {
      this.quoteCard.author = this.author
      this.$emit("changeQuoteCard", this.quoteCard)
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.chipsWords = M.Chips.init(this.$refs.chipsWords, {
        placeholder: "Enter related words",
        data: this.quoteCard.words.map((w) => ({ tag: w })),
        onChipDelete: () => this.updateWords(),
        onChipAdd: () => this.updateWords(),
      })
      this.chipsTags = M.Chips.init(this.$refs.chipsTags, {
        placeholder: "Enter tags",
        data: this.quoteCard.tags.map((t) => ({ tag: t })),
        onChipDelete: () => this.updateTags(),
        onChipAdd: () => this.updateTags(),
      })

      this.quote = this.quoteCard.quote
      this.author = this.quoteCard.author
      this.$nextTick(() => {
        M.updateTextFields()
        M.textareaAutoResize(this.$refs.textarea)
      })
    })
  },
  methods: {
    updateTags() {
      this.quoteCard.tags = this.chipsTags.chipsData.map((t) => t.tag)
      this.$emit("changeQuoteCard", this.quoteCard)
    },
    updateWords() {
      this.quoteCard.words = this.chipsWords.chipsData.map((t) => t.tag)
      this.$emit("changeQuoteCard", this.quoteCard)
    },
  },
  beforeDestroy() {
    if (this.chipsWords && this.chipsWords.destroy) {
      this.chipsWords.destroy()
    }
    if (this.chipsTags && this.chipsTags.destroy) {
      this.chipsTags.destroy()
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

textarea {
  border: 1px solid #9e9e9e;
  border-radius: 5px;
  min-height: 8rem;
  padding: 1.5rem 2.5rem;
  position: relative;

  &:focus:not([readonly]) {
    border: 1px solid #26a69a;
    box-shadow: 1px 1px 0 0 #26a69a, -1px -1px 0 0 #26a69a;
  }
}

.author i {
  position: absolute;
  left: -1.5rem;
  top: 30%;
}

.textarea::before {
  content: "«";
  display: block;
  position: absolute;
  transform: scale(2);
  left: 2rem;
  top: 0.5rem;
}
.textarea::after {
  content: "»";
  display: block;
  position: absolute;
  transform: scale(2);
  right: 2rem;
  bottom: 2rem;
}

textarea ~ label {
  padding: 2rem 40%;
}
textarea ~ label.active {
  opacity: 0;
  transition: 0.2s;
  z-index: -1;
}

.chips .input {
  width: 10rem !important;
}

@include for-phone-only {
  textarea ~ label {
    padding: 1.5rem 20%;
  }
}

@include for-tablet-portrait-only {
  textarea ~ label {
    padding: 1.5rem 35%;
  }
}
</style>
