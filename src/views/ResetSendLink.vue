<template>
  <LoaderPage v-if="isLoading || isLogged" />
  <form v-else class="card auth-card" @submit.prevent="handleSubmit">
    <div class="progress  blue lighten-4" style="margin:0;" v-visible="loading">
      <div class="indeterminate blue"></div>
    </div>
    <div class="card-content">
      <span class="card-title center">{{
        "ResetSendLink/Title" | localize
      }}</span>
      <hr />
      <p class="center" style="margin-bottom:2rem">
        {{ "ResetSendLink/Message" | localize }}
      </p>

      <div class="input-field">
        <input
          type="text"
          id="email"
          v-model="email"
          :class="{ invalid: $v.email.$dirty && !$v.email.required }"
        /><label label for="email">{{
          "ResetSendLink/EmailLabel" | localize
        }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >{{ "ResetSendLink/EmailError" | localize }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div class="center">
        <button
          type="submit"
          class="btn waves-effect waves-light auth-button blue"
        >
          {{ "ResetSendLink/ButtonSubmit" | localize }}
        </button>
      </div>
    </div>
    <div id="modal1" class="modal" ref="modal">
      <div class="modal-content">
        <h4 class="center">{{ "ResetSendLink/ModalTitle" | localize }}</h4>
        <p class="center">
          {{ "ResetSendLink/ModalMessage" | localize }}
        </p>
      </div>
      <div class="modal-footer" style="text-align:center">
        <router-link to="/" class="modal-close waves-effect waves-light btn">
          {{ "ResetSendLink/HomeLink" | localize }}</router-link
        >
      </div>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import unAuth from "@/mixins/unAuth.mixin.js"
export default {
  mixins: [unAuth],
  data: () => ({
    email: "",
    loading: false,
    isModalOpen: false,
  }),
  validations: {
    email: { required },
  },
  mounted() {
    M.Modal.init(this.$refs.modal, {
      dismissible: false,
      endingTop: "35%",
    })
  },
  watch: {
    isModalOpen() {
      M.Modal.getInstance(this.$refs.modal).open()
    },
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        this.loading = true
        const isUserExist = await this.$store.dispatch("resetLink", {
          email: this.email,
        })
        if (isUserExist) {
          this.isModalOpen = true
        } else if (isUserExist !== undefined) {
          this.$messageRed("User With This Email Address Not Found ")
        }
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
  beforeDestroy() {
    if (this.$refs.modal && this.$refs.modal.destroy) this.$refs.modal.destroy()
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";
.card-panel {
  margin: 1.5rem auto 1.5rem;
  padding: 0.5rem;

  p {
    color: white;
  }
}

@include for-phone-only {
  #modal1 {
    height: 280px;
  }
}
</style>
