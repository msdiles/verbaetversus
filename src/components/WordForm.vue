<template>
  <form class="col s12 m6" id="add-word" @submit.prevent="handleSubmit">
    <div class="row">
      <div class="input-field col s12">
        <input
          id="word"
          type="text"
          v-model="word"
          :class="{ invalid: $v.word.$error }"
        />
        <label for="word">Enter word</label>
        <small class="helper-text invalid" v-if="$v.word.$error"
          >Enter word</small
        >
      </div>
    </div>

    <div class="row">
      <div class="input-field col s12">
        <textarea
          ref="textarea"
          id="meaning"
          class="materialize-textarea"
          :class="{ invalid: $v.meaning.$error }"
          v-model="meaning"
        ></textarea>
        <label for="meaning">Add meaning of the world</label>
        <small class="helper-text invalid" v-if="$v.meaning.$error"
          >Enter a meaning</small
        >
      </div>
    </div>
    <div class="chips chips-placeholder" ref="chips"></div>

    <div class="buttons">
      <button
        type="button"
        class="btn blue waves-effect waves-light btn-add"
        @click.prevent="addMeaning"
        :class="{ disabled: !word || !meaning }"
      >
        <i class="material-icons left">add</i>
        Add meaning
      </button>
      <button
        type="button"
        class="btn red waves-effect waves-light btn-clear"
        @click.prevent="clearFields"
        :class="{ disabled: !wordCard.meanings.length }"
      >
        <i class="material-icons left">clear</i>
        Clear Fields
      </button>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import { v4 as uuidv4 } from "uuid"

export default {
  props: ["propWordCard"],
  data: () => ({
    meaning: "",
    chips: null,
    word: "",
  }),
  validations: {
    meaning: { required },
    word: { required },
  },
  computed: {
    wordCard() {
      return JSON.parse(JSON.stringify(this.propWordCard))
    },
  },
  watch: {
    word() {
      this.$emit("changeWordCard", { ...this.wordCard, word: this.word })
    },
  },
  mounted() {
    this.word = this.wordCard.word

    this.$nextTick(() => {
      this.chips = M.Chips.init(this.$refs.chips, {
        placeholder: "Enter tags",
      })
    })
  },
  methods: {
    addMeaning() {
      if (this.$v.meaning.$invalid) {
        this.$v.meaning.$touch()
        return
      }
      this.wordCard.meanings.push({
        tags: [...this.chips.chipsData].map((tag, i) => {
          let arg = {}
          return (arg[i] = tag.tag)
        }),
        _id:uuidv4(),
        meaning: this.meaning,
      })
      this.meaning = ""
      for (let i = this.chips.chipsData.length; i >= 0; i--) {
        this.chips.deleteChip(i)
      }
      this.$emit("changeWordCard", this.wordCard)
      this.$nextTick(() => {
        M.updateTextFields()
        M.textareaAutoResize(this.$refs.textarea)
      })
    },
    clearFields() {
      this.word = ""
      this.meaning = ""
      this.wordCard.meanings = []
      for (let i = this.chips.chipsData.length; i >= 0; i--) {
        this.chips.deleteChip(i)
      }
      this.$emit("changeWordCard", this.wordCard)
      this.$nextTick(() => {
        M.updateTextFields()
        M.textareaAutoResize(this.$refs.textarea)
      })
    },
  },
  beforeDestroy() {
    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

form {
  position: sticky;
  top: 1rem;
  margin-bottom: 4rem;
}

.buttons {
  margin-top: 2rem;
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
  form {
    position: static;
  }
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
