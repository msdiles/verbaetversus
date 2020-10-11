<template>
  <div class="quote-page">
    <div>
      <div class="page-title">
        <h3>
          {{ "AddQuote/Title" | localize }}
        </h3>
      </div>
    </div>
    <QuoteForm :propQuoteCard="quoteCard" @changeQuoteCard="changeQuoteCard" />

    <div class="buttons">
      <button
        form="form"
        type="button"
        class="btn green waves-effect waves-light btn-add center"
        :class="{ disabled: !quoteCard.quote || !quoteCard.author }"
        @click="submitHandler"
      >
        {{ "AddQuote/ButtonSubmit" | localize }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import QuoteForm from "@/components/QuoteForm"
import createUrl from "@/utils/createUrl"

export default {
  data: () => ({
    quoteCard: {
      quote: "",
      author: "",
      tags: [],
      words: [],
    },
  }),
  computed: {
    ...mapState(["auth", "language"]),
  },
  methods: {
    changeQuoteCard(newQuoteCard) {
      this.quoteCard = JSON.parse(JSON.stringify(newQuoteCard))
    },
    async submitHandler() {
      try {
        const url = createUrl(this.quoteCard.quote)
        if (!url.length) {
          this.$error("Invalid quote value")
          throw new Error("Invalid quote value")
        }
        const data = {
          data: {
            quote: this.quoteCard.quote,
            author: this.quoteCard.author,
            tags: this.quoteCard.tags,
            words: this.quoteCard.words,
            userId: this.auth.user.id,
            url: url,
            inspiration: false,
            language: this.language,
          },
        }
        const result = await this.$store.dispatch("addQuote", data)
        if (result) {
          this.$message("Quote added")
          this.$router.push(`/quote/${result.target.url}`)
        }
      } catch (e) {}
    },
  },
  components: {
    QuoteForm,
  },
}
</script>

<style lang="scss" scoped>
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

.buttons {
  display: flex;
  justify-content: center;
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
</style>
