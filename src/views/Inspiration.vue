<template>
  <div class="inspiration-page">
    <div>
      <div class="page-title">
        <h3>
          Inspiration
        </h3>
      </div>
    </div>
    <h5 class="center">Try to write something with using proposed words:</h5>
    <div class="proposed-words">
      <div v-for="word in words" :key="word.id">
        <strong>{{ word.word | upper }}</strong>
      </div>
    </div>
    <div v-if="loading" class="card center"><Loader /></div>
    <QuoteForm
      v-else
      :propQuoteCard="quoteCard"
      :propIsInspiration="true"
      @changeQuoteCard="changeQuoteCard"
    />

    <div class="buttons" v-if="!loading">
      <button
        form="form"
        type="button"
        class="btn green waves-effect waves-light btn-add center"
        :class="{ disabled: !quoteCard.quote || !quoteCard.author }"
        @click="submitHandler"
      >
        Add quote
      </button>
    </div>
  </div>
</template>

<script>
import QuoteForm from "@/components/QuoteForm"
import createUrl from "@/utils/createUrl"
import { mapState } from "vuex"

export default {
  data: () => ({
    quoteCard: {
      quote: "",
      author: "",
      tags: [],
      words: [],
    },
    loading: false,
    words: [],
  }),
  computed: {
    ...mapState(["auth"]),
  },
  async mounted() {
    try {
      this.loading = true
      const data = "?number=" + Math.floor(3 + Math.random() * 8)
      const res = await this.$store.dispatch("searchWords", data)
      if (res.success) {
        this.words = res.result.map((i) => ({ word: i.word, id: i._id }))
        this.quoteCard.words = res.result.map((i) => i.word)
      }
    } catch (e) {
    } finally {
      this.loading = false
    }
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
            inspiration: true,
          },
        }
        const result = await this.$store.dispatch("addQuote", data)
        if (result) {
          this.$message("Quote added")
          this.$router.push(`/quote/${result.target.url}`)
        }
      } catch (e) {
      }
    },
  },
  components: { QuoteForm },
}
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: center;
}

.proposed-words {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem 0;
  padding: 1rem 0;
  // border-top: 1px solid rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  & > div {
    display: flex;
    justify-content: space-between;
    margin: 0 1.5rem;
  }
}
</style>
