<template>
  <div class="card">
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field textarea col s12">
            <textarea
              id="quote"
              class="materialize-textarea"
              :value="propQuoteCard.quote"
              disabled
              style="color:black"
              ref="textarea"
            ></textarea>
          </div>

          <div class="input-field col s11 offset-s1 m5 offset-m6 author">
            <i class="material-icons">remove</i>

            <p>{{ propQuoteCard.author }}</p>
          </div>

          <div
            class="col s10 chips offset-s1"
            ref="chipsTags"
            style="margin-top:2rem"
          >
            <div class="chip" style="background:none">Words:</div>
            <router-link
              tag="div"
              :to="`/word/${word}`"
              v-for="word in propQuoteCard.words"
              class="chip"
              :key="word"
            >
              {{ word }}
            </router-link>
          </div>
          <div
            class="col s10  chips offset-s1"
            ref="chipsWords"
            style="margin-top:2rem"
          >
            <div class="chip" style="background:none">Tags:</div>
            <router-link
              tag="div"
              :to="`/quotes/?tag=${tag}`"
              v-for="tag in propQuoteCard.tags"
              class="chip"
              :key="tag"
            >
              {{ tag }}
            </router-link>
          </div>

          <div class="col s12 m4 offset-m6 added-info">
            <p>
              Added by
              <router-link :to="`${propQuoteCard.username}/profile`">{{
                propQuoteCard.username
              }}</router-link
              >. {{ propQuoteCard.date | date("date") }}
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propQuoteCard: Object,
  },
  mounted(){
    this.$nextTick(()=>{
      M.updateTextFields()
      M.textareaAutoResize(this.$refs.textarea);
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.author > input,
.chips {
  border-bottom: 1px solid black !important;
}
.added-info {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-style: italic;
  font-size: 0.8rem;
  p {
    text-align: center;
  }
}

textarea {
  border-left: 1px solid #9e9e9e;
  border-right: 1px solid rgba(158, 158, 158, 0.3);
  border-bottom: 1px solid rgba(158, 158, 158, 0.3) !important;
  border-top: 1px solid #9e9e9e;
  box-shadow: 2px 2px 1px 1px #9e9e9e;
  border-radius: 5px;
  min-height: 8rem;
  padding: 2.5rem 3.5rem;
  position: relative;
  font-family: "Caveat", cursive;
  font-size: 1.3rem;
}
.author {
  display: block;
  font-family: "Spectral", serif;
  font-weight: 800;
  i {
    position: absolute;
    left: -1.5rem;
    top: 30%;
  }
  p {
    border-bottom: 1px solid black !important;
  }
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

.chip {
  cursor: pointer;
  &:hover {
    background-color: #26a69a;
  }
}

@include for-phone-only {
   textarea{
     padding: 1rem 2rem;
   }
}
</style>
