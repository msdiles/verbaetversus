<template>
  <div class="text-loader" ref="loader">
    <div
      v-for="index in propLinesNumber"
      :key="index"
      class="element"
      :style="'--element-height:' + elementHeight"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    propLinesNumber: Number,
  },
  data: () => ({
    elementHeight: 10,
  }),
  mounted() {
    this.elementHeight =
      Math.floor(
        (this.$el.clientHeight - (this.propLinesNumber + 1) * 10) /
          this.propLinesNumber
      ) + "px"
  },
}
</script>

<style lang="scss" scoped>
.text-loader {
  height: 80%;
  .element {
    height: var(--element-height);
    margin: 10px;
    background-color: rgba(165, 165, 165, 0.2);
  }
  .element:nth-child(4n + 1) {
    width: 60%;
  }
  .element:nth-child(4n + 2) {
    width: 80%;
  }
  .element:nth-child(4n + 3) {
    width: 15%;
  }
  .element:nth-child(4n + 4) {
    width: 30%;
  }
}
</style>
