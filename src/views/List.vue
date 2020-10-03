<template>
  <div class="quotes-list">
    <div class="page-title">
      <h3>
        List of Quotes
      </h3>
    </div>

    <form class="card" @submit.prevent="submitHandler">
      <div class="row search-bar">
        <div class="col s8  m9 offset-s1  offset-m1" style="margin-left:1rem">
          <div class="row">
            <div
              class="col s1 input-field quote-prefix"
              style="margin-right:1rem"
            >
              Quote:
            </div>
            <div class="input-field ">
              <input
                class="col s12 m10"
                type="text"
                placeholder="Enter quote or part of quote"
                v-model="quote"
              />
            </div>
          </div>
        </div>
        <div class="col s3 m2 search ">
          <button
            class="btn green waves-effect waves-light"
            :disabled="!quote && !word && !tag && !author && !(number > 0)"
          >
            Search
          </button>
        </div>
      </div>

      <div>
        <div class="switcher" @click="isSwitched = !isSwitched">
          Show other options<i
            class="material-icons left"
            :class="{ switched: isSwitched }"
            >arrow_drop_down</i
          >
        </div>
        <transition name="options">
          <div class="anotherOptions" v-show="isSwitched">
            <div class="row">
              <div class="input-field col s5 offset-s1">
                <input
                  id="word"
                  type="text"
                  class="validate"
                  autocomplete="off"
                  v-model="word"
                />
                <label for="word">Related word</label>
              </div>
              <div class="input-field col s5">
                <input
                  id="tag"
                  type="text"
                  class="validate"
                  autocomplete="off"
                  v-model="tag"
                />
                <label for="tag">Tag</label>
              </div>
              <div class="input-field col s5 offset-s1">
                <input
                  id="author"
                  type="text"
                  class="validate"
                  autocomplete="off"
                  v-model="author"
                />
                <label for="author">Author</label>
              </div>
              <div class="input-field col s5">
                <input
                  id="number"
                  type="number"
                  min="0"
                  max="1000"
                  class="validate"
                  v-model="number"
                />
                <label for="number">Number of quotes</label>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </form>

    <div class="list card">
      <ul v-if="quotes.list" class="collapsible popout" ref="collapsible">
        <QuoteCollapsible
          v-for="q in quotes.list"
          :key="q._id"
          :propQuoteCard="q"
        />
      </ul>
      <div v-if="!quotes.list && !fetched && !loading" class="empty-list">
        <div>Enter some word, tag, author or part of quote</div>
      </div>
      <div v-if="!quotes.list && fetched && !loading" class="empty-list">
        <div>Quotes not found</div>
      </div>
      <div v-if="!quotes.list && loading" class="empty-list">
        <div>
          <Loader />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuoteCollapsible from "@/components/QuoteCollapsible"
import { mapState } from "vuex"
export default {
  data: () => ({
    isSwitched: false,
    quote: "",
    word: "",
    tag: "",
    author: "",
    number: "",
    loading: false,
    fetched: false,
  }),
  computed: {
    ...mapState(["quotes"]),
  },
  watch: {
    "quotes.list"() {
      this.$nextTick(() => {
        M.Collapsible.init(this.$refs.collapsible, {})
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      M.Collapsible.init(this.$refs.collapsible, {})
    })
  },
  methods: {
    async submitHandler() {
      try {
        this.loading = true
        this.fetched = false
        const data = {}
        if (this.quote) data.quote = this.quote
        if (this.word) data.word = this.word
        if (this.tag) data.tag = this.tag
        if (this.author) data.author = this.author
        if (this.number) data.number = this.number
        let urlString = "?"
        Object.keys(data).forEach((param, idx, arr) => {
          if (idx === arr.length - 1) {
            urlString += `${param}=${data[param]}`
            return
          } else {
            urlString += `${param}=${data[param]}&`
            return
          }
        })
        if (Object.keys(data).length) {
          const res = await this.$store.dispatch(
            "searchQuotes",
            encodeURI(urlString)
          )
          if (res.success === false) {
            this.fetched = true
          }
        }
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
  components: {
    QuoteCollapsible,
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";
.search {
  margin: 1rem 0;
}

form {
  border-bottom: 1px solid lightgrey;
  padding-bottom: 1rem;
  .search-bar {
    margin-bottom: 0;
  }
  .switcher {
    margin-bottom: 1rem;
    margin-left: 10%;
    cursor: pointer;
    i {
      margin-right: 0;
      transition: 0.3s;
    }
    i.switched {
      transform: rotate(180deg);
    }
  }
  .anotherOptions {
    margin: 0 auto;
    border-top: 1px solid lightgray;
  }

  .options-enter-active,
  .options-leave-active {
    transition: all 0.3s;
    max-height: 230px;
  }
  .options-enter,
  .options-leave-to {
    max-height: 0;
    opacity: 0;
  }
}

.list {
  min-height: 20rem;
  position: relative;

  .empty-list {
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: 2rem;
    right: 2rem;
    opacity: 0.5;
    min-height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.collapsible {
  width: 90%;
  margin: 0 auto;
  padding: 1rem 0;
}

@include for-tablet-portrait-only {
  .collapsible {
    width: 96%;
  }
}

@include for-phone-only {
  .quote-prefix {
    display: none;
  }
  .search {
    padding-left: 0;
    button {
      // padding: 0.3rem;
      transform: scale(0.7);
    }
  }
  .collapsible {
    width: 100%;
  }
}
</style>
