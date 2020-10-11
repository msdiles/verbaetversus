<template>
  <form class="card" @submit.prevent="submitHandler">
    <div class="row search-bar">
      <div class="col s8  m9 offset-s1  offset-m1" style="margin-left:1rem">
        <div class="row">
          <div
            class="col s1 input-field quote-prefix"
            style="margin-right:1rem"
          >
            {{ "SearchQuotes/QuoteLabel" | localize }}
          </div>
          <div class="input-field ">
            <input
              class="col s12 m10"
              type="text"
              :placeholder="'SearchQuotes/QuotePlaceholder' | localize"
              v-model="options.quote"
            />
          </div>
        </div>
      </div>
      <div class="col s3 m2 search ">
        <button
          class="btn green waves-effect waves-light"
          :disabled="
            !options.quote &&
              !options.word &&
              !options.tag &&
              !options.author &&
              !(options.number > 0) &&
              !options.inspiration &&
              !options.favorite &&
              !options.language
          "
        >
          {{ "SearchQuotes/SearchButton" | localize }}
        </button>
      </div>
    </div>

    <div>
      <div class="switcher" @click="isSwitched = !isSwitched">
        {{ "SearchQuotes/ShowOptions" | localize
        }}<i class="material-icons left" :class="{ switched: isSwitched }"
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
                v-model="options.word"
              />
              <label for="word">{{
                "SearchQuotes/RelatedWordLabel" | localize
              }}</label>
            </div>
            <div class="input-field col s5">
              <input
                id="tag"
                type="text"
                class="validate"
                autocomplete="off"
                v-model="options.tag"
              />
              <label for="tag">{{ "SearchQuotes/TagLabel" | localize }}</label>
            </div>
            <div class="input-field col s5 offset-s1">
              <input
                id="author"
                type="text"
                class="validate"
                autocomplete="off"
                v-model="options.author"
              />
              <label for="author">{{
                "SearchQuotes/AuthorLabel" | localize
              }}</label>
            </div>
            <div class="input-field col s5">
              <input
                id="number"
                type="number"
                min="0"
                max="1000"
                class="validate"
                v-model="options.number"
              />
              <label for="number">{{
                "SearchQuotes/NumberLabel" | localize
              }}</label>
            </div>
            <p class="col s5 offset-s1">
              <label>
                <input
                  type="checkbox"
                  class="filled-in"
                  v-model="options.inspiration"
                />
                <span>{{ "SearchQuotes/ByUserCheckbox" | localize }}</span>
              </label>
            </p>
            <p class="col s5" v-visible="auth.user">
              <label>
                <input
                  type="checkbox"
                  class="filled-in"
                  v-model="options.favorite"
                />
                <span>{{ "SearchQuotes/FavoriteCheckbox" | localize }}</span>
              </label>
            </p>
            <div class="input-field col s5 offset-s1">
              <select v-model="options.language" ref="select" multiple>
                <option value="" disabled>{{
                  "SearchQuotes/SelectMessage" | localize
                }}</option>
                <option
                  v-for="key in Object.keys(languageProperty)"
                  :value="languageProperty[key]"
                  :key="key"
                  >{{ languageName[key] }}</option
                >
              </select>
              <label>{{ "SearchQuotes/SelectLabel" | localize }}</label>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex"
import { languageName, languageProperty } from "@/filters/localize.filter.js"

export default {
  props: {
    propSubmitHandler: Function,
    propCurrentPage: Number,
  },
  data: () => ({
    languageName: languageName,
    languageProperty: languageProperty,
    isSwitched: false,
    options: {
      quote: "",
      word: "",
      tag: "",
      author: "",
      number: "",
      inspiration: false,
      favorite: false,
      language: [],
    },
  }),
  computed: {
    ...mapState(["auth", "language"]),
  },
  mounted() {
    const query = this.$route.query
    Object.keys(query).forEach((key) => {
      if ((key = "language")) {
        if (!!query[key]) this.options[key] = query[key].split(",")
        return
      }
      this.options[key] = query[key]
    })
    const data = this.createURIObject()
    if (Object.keys(data).length > 0) {
      const url = this.createURI(data)
      this.propSubmitHandler(url, data)
    }

    this.select = M.FormSelect.init(this.$refs.select, {})
  },
  methods: {
    createURI(data) {
      const object = { ...data }
      let urlString = "?"
      Object.keys(object).forEach((param, idx, arr) => {
        if (idx === arr.length - 1) {
          urlString += `${param}=${object[param]}`
          return
        } else {
          urlString += `${param}=${object[param]}&`
          return
        }
      })
      return urlString
    },
    createURIObject() {
      const data = {}
      Object.keys(this.options).forEach((key) => {
        if (this.options[key]) {
          if (key === "language") {
            if (this.options[key].length > 0) {
              data[key] = this.options[key]
            }else{
               data[key] = this.language
            }
            return
          }
          data[key] = this.options[key]
          if (key === "favorite") data.user = this.auth.user.name
        }
      })
      return data
    },
    submitHandler() {
      const data = this.createURIObject()
      if (Object.keys(data).length > 0) {
        const url = this.createURI(data)
        this.propSubmitHandler(url, data)
        this.$router.push(`/quotes/list${this.createURI(data)}`)
      }
    },
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) this.select.destroy()
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

@include for-phone-only {
  .quote-prefix {
    display: none;
  }
  .search {
    padding-left: 0;
    button {
      transform: scale(0.7);
    }
  }
  .collapsible {
    width: 100%;
  }
}
</style>
