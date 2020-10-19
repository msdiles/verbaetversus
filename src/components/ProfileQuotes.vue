<template>
  <div class="list card">
      <ul
        v-if="quoteList && pagination.list"
        class="collapsible popout"
        ref="collapsible"
      >
        <QuoteCollapsible
          v-for="q in pagination.list[pagination.current]"
          :key="q._id"
          :propQuoteCard="q"
        />
      </ul>
      <div v-if="!quoteList.length " class="empty-list">
        <div>{{ "ProfileQuotes/NotFoundMessage" | localize }}</div>
      </div>
      <div v-if="!quoteList" class="empty-list">
        <div>
          <Loader />
        </div>
      </div>
      <Pagination
        v-if="quoteList && pagination.list && quoteList.length"
        :propPagination="pagination"
      />
    </div>
</template>

<script>
import QuoteCollapsible from "@/components/QuoteCollapsible"
import Pagination from "@/components/Pagination"
import pagination from "@/utils/pagination"
export default {
  props:{propQuotesList:Array},
  data: () => ({
    pagination: {},
    currentPage: null,
  }),
  computed:{
    quoteList(){
      return JSON.parse(JSON.stringify(this.propQuotesList))
    }
  },
  watch: {
    quoteList() {
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
      if (this.quoteList) {
        return pagination(this.quoteList, 10)
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
    QuoteCollapsible,
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
