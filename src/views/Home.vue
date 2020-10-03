<template>
  <div>
    <div class="page-title">
      <h3>
        Verba et versus
      </h3>
    </div>
    <div class="grid-container">
      <div class="grid-element">
        <router-link to="/quotes/list" tag="div" class="card-panel home-card-full">
          <div class="center"><p>List of quotes</p></div></router-link
        >
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
          <div class="center"><p>Inspiration</p></div>
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
export default {}
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
