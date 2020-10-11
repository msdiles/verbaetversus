<template>
  <div
    v-if="wordCard"
    :class="[
      { card: true, col: true, s12: true },
      propChangeMod ? 'm6' : 'm12',
    ]"
    style="height:100%"
  >
    <div class="card-content">
      <h4 class="center">
        {{
          wordCard.word
            ? wordCard.word[0].toUpperCase() + wordCard.word.slice(1)
            : "Word"
        }}
      </h4>
      <ul>
        <hr />
        <template v-for="(meaning, id) in wordCard.meanings">
          <li :key="meaning._id">
            <div class="row word-meaning" style="width:100%">
              <p align="justify" class=" col s12 m11">
                {{ id + 1 + ". " + meaning.meaning }}
              </p>
              <a
                href="#"
                class=" col  s1 m1"
                @click.prevent="deleteMeaning(meaning._id)"
                v-show="propChangeMod"
              >
                <i class="material-icons remove-button">remove</i>
              </a>

              <div class="col s12">
                <div class="chip" v-for="tag in meaning.tags" :key="tag">
                  {{ tag }}
                  <i
                    class="close material-icons"
                    @click="deleteTag(meaning._id, tag)"
                    v-show="propChangeMod"
                    >close</i
                  >
                </div>
              </div>
            </div>
          </li>
          <hr :key="meaning._id + new Date().getTime()"
        /></template>

        <UserInfoCard
        v-if="!propChangeMod"
          :propCard="propWordCard"
          :propUser="propUser"
          @toggleToFavorite="favoriteHandler"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import UserInfoCard from "@/components/UserInfoCard"
export default {
  props: {
    propWordCard: Object,
    propChangeMod: Boolean,
    propUser: Object,
  },
  data: () => ({}),
  computed: {
    wordCard() {
      return JSON.parse(JSON.stringify(this.propWordCard))
    },
  },
  methods: {
    deleteMeaning(id) {
      this.wordCard.meanings = [
        ...this.wordCard.meanings.filter((m) => m._id !== id),
      ]
      this.$emit("changeWordCard", this.wordCard)
    },
    deleteTag(id, tag) {
      this.wordCard.meanings = [
        ...this.wordCard.meanings.map((m) => {
          if (m._id === id) {
            return { ...m, tags: m.tags.filter((t) => t !== tag) }
          }
          return m
        }),
      ]
      this.$emit("changeWordCard", this.wordCard)
    },

    favoriteHandler() {
      this.$emit("toggleToFavorite")
    },
  },
  components: {
    UserInfoCard,
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";
.remove-button {
  color: red;
  border: 2px solid red;
  border-radius: 50%;
}

li {
  display: flex;
  justify-content: center;
  align-items: center;
}

div.word-meaning {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  p {
    overflow-wrap: break-word;
  }
  div {
    margin-top: 0.5rem;
  }
  a {
    position: absolute;
    top: calc(50% - 28px);
  }
}

@include for-phone-only {
  div.word-meaning a {
    position: absolute;
    right: -2% !important;
  }
}
</style>
