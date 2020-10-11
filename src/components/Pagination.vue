<template>
  <ul v-if="propPagination.list.length !== 1" class="pagination center">
    <li
      :class="{
        disabled: propPagination.current === 0,
        'waves-effect': propPagination.current !== 0,
      }"
      @click="propPagination.back()"
    >
      <a 
        ><i class="material-icons">chevron_left</i></a
      >
    </li>
    <li
      class="waves-effect"
      v-for="{ pos, idx } in propPagination.formatted"
      :key="idx"
      :class="{ active: propPagination.current === idx }"
      @click="propPagination.transition(idx)"
    >
      <a >{{ pos }}</a>
    </li>

    <li
      :class="{
        disabled: propPagination.current === propPagination.max,
        'waves-effect': propPagination.current < propPagination.max,
      }"
      @click="propPagination.forward()"
    >
      <a
        ><i class="material-icons">chevron_right</i></a
      >
    </li>
  </ul>
</template>

<script>
import pagination from "@/utils/pagination"

export default {
  props: {
    propPagination: Object,
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
.pagination {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
