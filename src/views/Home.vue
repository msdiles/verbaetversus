<template>
  <div>
    <div class="page-title">
      <h3>
        Verba et versus
      </h3>
    </div>
    <div class="grid-container">
      <div class="grid-element">
        <div class="card-panel home-card-full">
          <div class="center collection">
            <a class="collection-item ">List of quotes</a>
            <TextLoading v-if="loading" :propLinesNumber="20" />
            <router-link
              :to="`/quote/${quote.url}`"
              class="collection-item quote truncate "
              v-for="quote in quotes.list"
              :key="quote._id"
              >{{ quote.quote }}</router-link
            >

            <router-link to="/quotes/list" tag="a" class=" collection-item "
              >Search more quotes</router-link
            >
          </div>
        </div>
      </div>
      <div class="grid-element">
        <router-link
          to="/vocabulary-test"
          tag="div"
          class="card-panel home-card-third"
        >
          <div class="center"><p>Test your vocabulary</p></div></router-link
        >
      </div>
      <div class="grid-element">
        <router-link
          to="/words-quiz"
          tag="div"
          class="card-panel home-card-third"
        >
          <div class="center"><p>Word quiz</p></div></router-link
        >
      </div>
      <div class="grid-element ">
        <router-link
          to="/inspiration"
          tag="div"
          class="card-panel home-card-third"
        >
          <div class="center">
            <p>Inspiration</p>
            <i class="material-icons"> create </i>
          </div>
        </router-link>
      </div>
      <div class="grid-element ">
        <router-link
          to="/words/add"
          tag="div"
          class="card-panel home-card-third"
        >
          <div class="center">
            <p>Add word</p>
            <i class="material-icons">add</i>
          </div></router-link
        >
      </div>
      <div class="grid-element">
        <router-link
          to="/quotes/add"
          tag="div"
          class="card-panel  home-card-third"
        >
          <div class="center">
            <p>Add quote</p>
            <i class="material-icons">format_quote</i>
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import TextLoading from "@/components/common/TextLoading"
import { mapState } from "vuex"
export default {
  data: () => ({ loading: false }),
  computed: {
    ...mapState(["quotes"]),
  },
  async mounted() {
    try {
      this.loading = true
      const data = "?number=8"
      await this.$store.dispatch("searchQuotes", data)
    } catch (e) {
    } finally {
      this.loading = false
    }
  },
  components: {
    TextLoading,
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    " a a b c"
    "a a d d"
    "a a e f";
}

.grid-container .grid-element {
  padding: 0 1rem;

  & .card-panel:hover {
    background-color: #ddd;
    transition: 0.2s;
  }
}

.grid-container .grid-element:nth-child(1) {
  grid-area: a;
}
.grid-container .grid-element:nth-child(2) {
  grid-area: b;
}
.grid-container .grid-element:nth-child(3) {
  grid-area: c;
}
.grid-container .grid-element:nth-child(4) {
  grid-area: d;
}
.grid-container .grid-element:nth-child(5) {
  grid-area: e;
}
.grid-container .grid-element:nth-child(6) {
  grid-area: f;
}

.home-card-full {
  cursor: pointer;
  height: 33rem;
  padding: 0;
  .collection {
    height: 100%;
    .collection-item {
      height: 10%;
    }
    .quote {
      font-family: "Caveat", cursive;
      font-size: 1.3rem;
      color: black;
    }

    a:nth-child(1) {
      color: black;
      &:hover {
        background-color: #ffffff;
        cursor: auto;
      }
    }
    a:last-child {
      color: black;
      border-top: 1px solid #e0e0e0;
      min-height: 15%;
      text-align: center;
    }
  }
}

.home-card-third {
  cursor: pointer;
  height: 10rem;
}
@include for-phone-only {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(6, 1fr);
    grid-template-areas:
      "b c"
      "d d"
      "e f"
      "a a"
      "a a"
      "a a";
  }

  .grid-container .grid-element {
    padding: 0 0.5rem;
  }
}
</style>
