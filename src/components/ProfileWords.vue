<template>
  <div class="list card">
      <ul
        v-if="wordList && pagination.list"
        class="collapsible popout"
        ref="collapsible"
      >
        <WordCollapsible
          v-for="q in pagination.list[pagination.current]"
          :key="q._id"
          :propWordCard="q"
        />
      </ul>
      <div v-if="!wordList.length " class="empty-list">
        <div>{{ "ProfileWords/NotFoundMessage" | localize }}</div>
      </div>
      <div v-if="!wordList" class="empty-list">
        <div>
          <Loader />
        </div>
      </div>
      <Pagination
        v-if="wordList && pagination.list && wordList.length"
        :propPagination="pagination"
      />
    </div>
</template>

<script>
import WordCollapsible from "@/components/WordCollapsible"
import Pagination from "@/components/Pagination"
import pagination from "@/utils/pagination"
export default {
  props:{propWordsList:Array},
  data: () => ({
    pagination: {},
    currentPage: null,
  }),
  computed:{
    wordList(){
      return JSON.parse(JSON.stringify(this.propWordsList))
    }
  },
  watch: {
    wordList() {
      this.pagination = this.createPagination()
      if (this.pagination.current >= 0) {
        this.pagination.current =
          this.currentPage < 0
            ? 0
            : this.currentPage >= this.pagination.list.length
            ? this.pagination.list.length - 1
            : this.currentPage - 1 < 0
            ? this.currentPage
            : this.currentPage
        this.$route.query.page = this.pagination.current
      }


        this.$nextTick(() => {
          M.Collapsible.init(this.$refs.collapsible, {})
        })
    },
    "pagination.current"() {
      if (this.pagination.current >= 0) {
        if (this.pagination.current < this.pagination.list.length) {
          this.updatePath(this.pagination.current + 1)
        } else {
          this.updatePath(this.pagination.list.length)
        }
      }
    },
  },
  mounted() {
    this.pagination = this.createPagination()
    this.$nextTick(() => {
      M.Collapsible.init(this.$refs.collapsible, {})
      M.updateTextFields()
    })
  },
  methods: {
    createPagination() {
      if (this.wordList) {
        return pagination(this.wordList, 10)
      }

      return {}
    },
    updatePath(n) {
      if (n > 0 && n <= this.pagination.list.length + 1) {
        this.pagination.update()
      }
    },
  },
  components: {
    WordCollapsible,
    Pagination,
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.list {
  min-height: 20rem;
  position: relative;
  padding-bottom: 2rem;
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
  margin: 0 auto 2rem;
  padding: 1rem 0;
}

@include for-tablet-portrait-only {
  .collapsible {
    width: 96%;
  }
}
</style>
