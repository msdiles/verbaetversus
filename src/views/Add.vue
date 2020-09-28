<template>
  <div>
    <div class="page-title">
      <h3>
        Add word
      </h3>
    </div>

    <div class="row">
      <WordForm
        v-if="true"
        :changeMod="true"
        :propWordCard="wordCard"
        @changeWordCard="changeWordCard"
      />

      <WordCard
        :propWordCard="wordCard"
        :propChangeMod="true"
        @changeWordCard="changeWordCard"
      />

      <div class="center">
        <button
          class="btn green  waves-effect waves-light  "
          type="button"
          form="add-word"
          style="margin-top:2rem"
          @click.prevent="handleSubmit"
          :class="{ disabled: !wordCard.meanings.length }"
        >
          Add word
          <i class="material-icons right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid"
import { required } from "vuelidate/lib/validators"
import WordForm from "@/components/WordForm"
import WordCard from "@/components/WordCard"
export default {
  data: () => ({
    wordCard: {
      meanings: [],
    },
  }),

  methods: {
    changeWordCard(newWordCard) {
      this.wordCard = JSON.parse(JSON.stringify(newWordCard))
    },
    async handleSubmit() {
      const fetchData = {
        word: this.wordCard.word,
        id: this.wordCard._id,
        meanings: this.wordCard.meanings.map((m) => {
          return { tags: m.tags, meaning: m.meaning }
        }),
      }
      try {
        const result = await this.$store.dispatch("addWord", fetchData)
        if (!!result) {
          this.$message("Word Added")
          this.clearFields()
        } else {
          this.$message("Word Already Exists")
        }
      } catch (e) {}
    },
  },
  components: { WordForm, WordCard },
  beforeDestroy() {
    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }
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


.buttons {
  display: flex;
  justify-content: center;
  .btn-add {
    margin-right: 1rem;
  }
  .btn-clear {
    margin-left: 1rem;
  }
}

@include for-phone-only {

  .buttons {
    display: flex;
    justify-content: safe;
    .btn-add {
      margin-right: 0.1rem;
    }
    .btn-clear {
      margin-left: 0.1rem;
    }
  }
}
</style>
