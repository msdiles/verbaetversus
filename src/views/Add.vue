<template>
  <div>
    <div class="page-title">
      <h3>
        Add word
      </h3>
    </div>

    <div class="row">
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

        <div class="center">
          <button
            type="button"
            class="btn blue waves-effect waves-light"
            @click.prevent="addMeaning"
          >
            <i class="material-icons left">add</i>
            Add meaning
          </button>
        </div>
      </form>

      <div class="card col s12 m6" style="height:100%">
        <div class="card-content">
          <h4 class="center">
            {{ word ? word[0].toUpperCase() + word.slice(1) : "Word" }}
          </h4>
          <ul>
            <hr />
            <template v-for="(meaning, id) in wordCard.meanings">
              <li :key="meaning.id">
                <div class="row word-meaning" style="width:100%">
                  <p align="justify" class=" col s12 m11">
                    {{ id + 1 + ". " + meaning.meaning }}
                  </p>
                  <a
                    href="#"
                    class=" col  s1 m1"
                    @click.prevent="deleteMeaning(meaning.id)"
                  >
                    <i class="material-icons remove-button">remove</i>
                  </a>

                  <div class="col s12">
                    <div
                      class="chip"
                      v-for="tag in meaning.tags"
                      :key="tag.tag"
                    >
                      {{ tag.tag }}
                      <i class="close material-icons"></i>
                    </div>
                  </div>
                </div>
              </li>
              <hr :key="meaning.id + new Date()"
            /></template>
          </ul>
        </div>
      </div>
      <div class="center">
        <button
          class="btn green  waves-effect waves-light  "
          type="submit"
          form="add-word"
          style="margin-top:2rem"
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
export default {
  data: () => ({
    word: "",
    meaning: "",
    chips: null,
    wordCard: {
      meanings: [],
    },
  }),
  mounted() {
    this.$nextTick(() => {
      this.chips = M.Chips.init(this.$refs.chips, { placeholder: "Enter tags" })
    })
  },
  validations: {
    meaning: { required },
    word: { required },
  },
  methods: {
    addMeaning() {
      if (this.$v.meaning.$invalid) {
        this.$v.meaning.$touch()
        return
      }
      this.wordCard.meanings.push({
        meaning: this.meaning,
        tags: [...this.chips.chipsData],
        id: uuidv4(),
      })
      this.meaning = ""
      this.chips.chipsData
      for (let i = this.chips.chipsData.length; i >= 0; i--) {
        this.chips.deleteChip(i)
      }
      this.$nextTick(() => {
        M.updateTextFields()
        M.textareaAutoResize(this.$refs.textarea)
      })
    },
    deleteMeaning(id) {
      this.wordCard.meanings = [
        ...this.wordCard.meanings.filter((m) => m.id !== id),
      ]
    },
    handleSubmit() {
      if (this.$v.word.$invalid) {
        this.$v.word.$touch()
        return
      }
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

form {
  position: sticky;
  top: 1rem;
  margin-bottom: 2rem;
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
  form {
    position: static;
  }
  div.word-meaning a {
    position: absolute;
    right:-2% !important;
  }
}
</style>
