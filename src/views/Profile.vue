<template>
  <section>
    <div class="page-title">
      <h3>
        {{ "Profile/ProfileTitle" | localize}}
      </h3>
    </div>

    <div class="row">
      <div class="col s3 sidebar ">
        <div class="collection">
          <a href="#!" class="collection-item">Account</a>
          <a href="#!" class="collection-item">Statistic</a>
          <a href="#!" class="collection-item">Words</a>
          <a href="#!" class="collection-item">Friends</a>
        </div>
      </div>
      <div v-if="auth.loading || !auth.isUserLoggedIn" class="col s9 row info">
        <Loader class="center" />
      </div>

      <div v-else class="col s9 row info">
        <div class="col s4 avatar-box">
          <i class="material-icons large">account_circle </i>
        </div>
        <div class="col s8">
          <p>Name : {{ auth.user.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(["auth"]),
  },

  async mounted() {
    try {
      await this.$store.dispatch("getUserInfo")
    } catch (e) {}
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.3);
}

.info {
  padding: 1rem;
}
</style>
