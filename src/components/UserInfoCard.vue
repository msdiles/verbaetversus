<template>
  <div>
    <div class="col s12 m4 offset-m6 added-info">
      <p>
        {{ "UserInfoCard/AddedBy" | localize }}
        <router-link :to="`${propCard.username}/profile`">{{
          propCard.username
        }}</router-link
        >. {{ propCard.date | date("date") }}
      </p>
    </div>
    <div
      v-if="propUser"
      class="col s12 m4 offset-s5 offset-m6 added-info add-to-favorite"
    >
      <i
        :key="propCard.favorite.indexOf(propUser.name) !== -1"
        class="material-icons"
        :class="{
          added: propCard.favorite.indexOf(propUser.name) !== -1,
        }"
        @click="favoriteHandler"
        v-tooltip="
          this.propCard.favorite.indexOf(this.propUser.name) > -1
            ? `${$options.filters.localize('Favorite/Remove')}`
            : `${$options.filters.localize('Favorite/Add')}`
        "
        >favorite
      </i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propCard: Object,
    propUser: Object,
  },
  methods: {
    favoriteHandler() {
      this.$emit("toggleToFavorite")
    },
  },
}
</script>

<style lang="scss" scoped>
.added-info {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-style: italic;
  font-size: 0.8rem;
  p {
    text-align: center;
  }
}

.add-to-favorite {
  .added {
    color: red;
  }
  opacity: 0.7;
  i:hover {
    opacity: 1;
    transition: 0.2s;
    color: red;
    cursor: pointer;
  }
}
</style>
