<template>
  <div class="quotes-list">
    <div class="page-title">
      <h3>
        {{ "List/Title" | localize }}
      </h3>
    </div>

    <SearchQuotes
      :propSubmitHandler="submitHandler"
      :propCurrentPage="currentPage"
    />

    <div class="list card">
      <ul
        v-if="quotes.list && pagination.list"
        class="collapsible popout"
        ref="collapsible"
      >
        <QuoteCollapsible
          v-for="q in pagination.list[pagination.current]"
          :key="q._id"
          :propQuoteCard="q"
        />
      </ul>
      <div v-if="!quotes.list && !fetched && !loading" class="empty-list">
        <div>{{ "List/EnterWordMessage" | localize }}</div>
      </div>
      <div v-if="!quotes.list && fetched && !loading" class="empty-list">
        <div>{{ "List/NotFoundMessage" | localize }}</div>
      </div>
      <div v-if="!quotes.list && loading" class="empty-list">
        <div>
          <Loader />
        </div>
      </div>
      <Pagination
        v-if="quotes.list && pagination.list"
        :propPagination="pagination"
      />
    </div>
  </div>
</template>

<script>
import QuoteCollapsible from "@/components/QuoteCollapsible"
import SearchQuotes from "@/components/SearchQuotes"
import Pagination from "@/components/Pagination"
import pagination from "@/utils/pagination"
import { mapState } from "vuex"
export default {
  data: () => ({
    loading: false,
    fetched: false,
    pagination: {},
    currentPage: null,
  }),
  computed: {
    ...mapState(["quotes"]),
  },
  watch: {
    "quotes.list"() {
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
    const query = this.$route.query

    if (query.hasOwnProperty("page") && !isNaN(+this.$route.query.page)) {
      this.currentPage = +this.$route.query.page - 1
    } else {
      this.currentPage = 0
    }
    this.$nextTick(() => {
      M.Collapsible.init(this.$refs.collapsible, {})
      M.updateTextFields()
    })
  },
  methods: {
    async submitHandler(url, data) {
      try {
        this.loading = true
        this.fetched = false
        if (url) {
          const res = await this.$store.dispatch("searchQuotes", encodeURI(url))
          if (res.success === false) {
            this.fetched = true
          }
        }
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    createPagination() {
      if (this.quotes.list) {
        return pagination(this.quotes.list, 10)
      }
      return {}
    },
    updatePath(n) {
      if (n > 0 && n <= this.pagination.list.length + 1) {
        this.$router.push({
          path: this.$route.fullPath,
          query: { ...this.$route.query, page: n },
        })
        this.pagination.update()
      }
    },
  },
  components: {
    QuoteCollapsible,
    Pagination,
    SearchQuotes,
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
