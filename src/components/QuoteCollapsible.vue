<template>
  <li>
    <div class="collapsible-header row">
      <textarea
        :value="propQuoteCard.quote"
        disabled
        ref="textarea"
        class="col s12 m8"
      ></textarea>
      <div class="author col s12 m4">
        <i class="material-icons">remove</i>
        <p>{{ propQuoteCard.author }}</p>
      </div>
    </div>
    <div class="collapsible-body row">
      <div class="tags col s12 m4" v-show="propQuoteCard.tags.length">
        {{ "QuoteCollapsible/TagsList" | localize }}
        <div
          class="chip"
          v-for="(tag, index) in propQuoteCard.tags"
          :key="index"
        >
          {{ tag }}
        </div>
      </div>
      <div
        class="words col s12  m4"
        v-show="propQuoteCard.words.length"
        :class="{ 'offset-m4': !propQuoteCard.tags.length }"
      >
        {{ "QuoteCollapsible/WordsList" | localize }}
        <div
          class="chip"
          v-for="(word, index) in propQuoteCard.words"
          :key="index"
        >
          {{ word }}
        </div>
      </div>

      <router-link
        :to="`/quote/${propQuoteCard.url}`"
        class="btn green waves-effect waves-light col  s12 m4"
        :class="{
          'offset-m4': !propQuoteCard.words.length,
          'offset-m8':
            !propQuoteCard.tags.length && !propQuoteCard.words.length,
        }"
        >{{ "QuoteCollapsible/QuoteLink" | localize }}</router-link
      >
    </div>
  </li>
</template>

<script>
export default {
  props: {
    propQuoteCard: Object,
  },
  mounted() {
    this.$nextTick(() => {
      M.textareaAutoResize(this.$refs.textarea)
    })
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

textarea {
  overflow: hidden;
  outline: none;
  border: 0;
  resize: none;
  cursor: pointer;
  font-family: "Caveat", cursive;
  font-size: 1.3rem;
}

.author {
  font-family: "Spectral", serif;
  font-weight: 800;
  display: flex;
  align-items: center;
  i {
    margin-right: 0;
  }
}

@include for-phone-only {
  .collapsible-header {
    display: block;
  }
  li {
    margin: 0 !important;
  }
}
</style>
