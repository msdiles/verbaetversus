<template>
  <li>
    <div class="collapsible-header row">
      <textarea
        :value="wordCard.meanings[0].meaning"
        disabled
        ref="textarea"
        class="col s12 m8"
      ></textarea>
      <div class="author col s12 m4">
        <i class="material-icons">remove</i>
        <p>{{ wordCard.word }}</p>
      </div>
    </div>
    <div class="collapsible-body row">
      <div
        class="tags col s12 m4"
        v-show="wordCard.meanings[0].tags.length"
      >
        {{ "WordCollapsible/TagsList" | localize }}
        <div
          class="chip"
          v-for="(tag, index) in wordCard.meanings[0].tags"
          :key="index"
        >
          {{ tag }}
        </div>
      </div>

      <router-link
        :to="`/word/${wordCard.word}`"
        class="btn green waves-effect waves-light col  s12 m4"
        :class="{
          'offset-m8': !wordCard.meanings[0].tags.length,
          'offset-m4': wordCard.meanings[0].tags.length,
        }"
        >{{ "WordCollapsible/QuoteLink" | localize }}</router-link
      >
    </div>
  </li>
</template>

<script>
export default {
  props: {
    propWordCard: Object,
  },
  computed:{

    wordCard(){
      return JSON.parse(JSON.stringify(this.propWordCard))
    }
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
