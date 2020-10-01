<template>
  <div class="quote-page">
    <Loader v-if="loading" class="card col s12 m6 center" style="height:60vh" />
    <QuoteCard
      v-else-if="quoteCard && !changeMode"
      :propQuoteCard="quoteCard"
    />

    <div v-else-if="!changeMode" class="card" style="height:60vh">
      <h4 class="center">Quote not found</h4>
      <div class="buttons another" style="margin-top:4rem">
        <router-link
          to="/"
          class="btn green waves-effect waves-light btn-add center"
          >To Home<i class="material-icons left">arrow_back </i></router-link
        >
        <router-link
          to="/quotes/add"
          class="btn green waves-effect waves-light btn-add center"
          ><i class="material-icons left">add</i>Add quote</router-link
        >
      </div>
    </div>

    <div v-else-if="isDeleted" class="card" style="height:60vh">
      <h4 class="center">Quote deleted!</h4>
      <div class="buttons another" style="margin-top:4rem">
        <router-link
          to="/"
          class="btn green waves-effect waves-light btn-add center"
          >To Home<i class="material-icons left">arrow_back </i></router-link
        >
        <router-link
          to="/quotes/add"
          class="btn green waves-effect waves-light btn-add center"
          ><i class="material-icons left">add</i>Add quote</router-link
        >
      </div>
    </div>

    <QuoteForm
      v-if="changeMode && !loading && !isDeleted"
      :propQuoteCard="quoteCard"
      @changeQuoteCard="changeQuoteCard"
    />
    <div
      v-if="!loading && quoteCard && isAllowed && !isDeleted"
      class="buttons"
    >
      <button
        type="button"
        class="btn orange waves-effect waves-light btn-add center"
        form="form"
        v-show="!changeMode && quoteCard"
        @click="changeMode = true"
      >
        Change quote
      </button>
      <button
        type="button"
        class="btn red waves-effect waves-light btn-add center"
        v-show="changeMode"
        @click="deleteHandler"
        :disabled="fetchLoading"
      >
        Delete quote
      </button>
      <button
        type="submit"
        class="btn green waves-effect waves-light btn-add center"
        form="form"
        v-show="changeMode"
        @click="updateHandler"
        :disabled="!quoteCard.quote || !quoteCard.author || fetchLoading"
      >
        Update quote
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import createUrl from "@/utils/createUrl"
import QuoteForm from "@/components/QuoteForm"
import QuoteCard from "@/components/QuoteCard"
import checkAccessMixin from "@/mixins/checkAccess.mixin"

export default {
  mixins: [checkAccessMixin("superadmin")],
  data: () => ({
    loading: false,
    quoteCard: null,
    changeMode: false,
    fetchLoading: false,
    isDeleted: false,
  }),
  computed: {
    ...mapState(["auth"]),
  },
  async mounted() {
    try {
      this.loading = true
      const quote = this.$route.params.quote
      if (!quote) {
        this.$router.push("/")
        this.$message("Invalid route")
      }
      const response = await this.$store.dispatch("findQuote", quote)
      if (!!response.success) {
        this.quoteCard = response.result
      } else {
        this.$message("Quote not found")
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
    async updateHandler() {
      try {
        this.fetchLoading = true
        const url =
          this.quoteCard.url.slice(0, this.quoteCard.url.indexOf("-")) +
          "-" +
          createUrl(this.quoteCard.quote)
        if (!url.length) {
          this.$error("Invalid quote value")
          throw new Error("Invalid quote value")
        }
        const data = {
          data: {
            ...this.quoteCard,
            url: url,
          },
        }
        const result = await this.$store.dispatch("updateQuote", data)
        if (result) {
          this.$message("Quote updated")
          this.$router.push(`/quote/${result.target.url}`).catch((e) => e)
          this.changeMode = false
        }
      } catch (e) {
      } finally {
        this.fetchLoading = false
      }
    },
    async deleteHandler() {
      try {
        this.fetchLoading = true
        const data = { id: this.quoteCard._id }
        const result = await this.$store.dispatch("deleteQuote", data)
        if (result) {
          this.$message("Quote deleted")
          this.isDeleted = true
        }
      } catch (e) {
      } finally {
        this.fetchLoading = false
      }
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
  components: {
    QuoteForm,
    QuoteCard,
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.quote-page {
  margin-top: 2rem;

  .card {
    padding: 1rem;
  }
}

.buttons {
  display: flex;
  justify-content: center;
}

.buttons {
  display: flex;
  justify-content: center;
  .btn {
    margin-left: 2rem;
  }
}
@include for-phone-only {
  .buttons.another {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a{
      margin-bottom:1rem ;
    }
  }
}
</style>