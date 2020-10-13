<template>
  <LoaderPage v-if="loadingCheck || isLoading || isLogged" />
  <form v-else class="card auth-card" @submit.prevent="handleSubmit">
    <div class="progress  blue lighten-4" style="margin:0;" v-visible="loading">
      <div class="indeterminate blue"></div>
    </div>
    <div class="card-content">
      <span class="card-title center">{{
        "ResetPassword/Message" | localize
      }}</span>
      <hr />

      <div class="input-field">
        <input
          type="password"
          id="password"
          v-model="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength) ||
              ($v.password.$dirty && !$v.password.mustHaveUppercase) ||
              ($v.password.$dirty && !$v.password.mustHaveLowercase) ||
              ($v.password.$dirty && !$v.password.mustHaveDigit) ||
              ($v.password.$dirty && !$v.password.mustNotHaveSpecial) ||
              ($v.password.$dirty && !$v.password.maxLength),
          }"
        /><label label for="password">{{
          "ResetPassword/PasswordLabel" | localize
        }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >{{ "ResetPassword/ErrorPassword" | localize }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          >{{ "ResetPassword/ErrorPasswordLengthStart" | localize }}
          {{ $v.password.$params.minLength.min
          }}{{ "ResetPassword/ErrorPasswordLengthEnd" | localize }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.mustHaveUppercase"
          >{{ "ResetPassword/ErrorPasswordUppercase" | localize }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.mustHaveLowercase"
          >{{ "ResetPassword/ErrorPasswordLowercase" | localize }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.mustHaveDigit"
          >{{ "ResetPassword/ErrorPasswordDigit" | localize }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.mustNotHaveSpecial"
          >{{ "ResetPassword/ErrorPasswordSpecial" | localize }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.maxLength"
          >{{ "ResetPassword/ErrorPasswordLengthMaxStart" | localize }}
          {{ $v.password.$params.maxLength.max }}
          {{ "ResetPassword/ErrorPasswordLengthMaxEnd" | localize }}
        </small>
      </div>

      <div class="input-field">
        <input
          type="password"
          id="resetPassword"
          v-model="passwordRepeat"
          :class="{
            invalid:
              ($v.passwordRepeat.$dirty && !$v.passwordRepeat.required) ||
              ($v.passwordRepeat.$dirty && !$v.passwordRepeat.sameAsPassword),
          }"
        /><label label for="resetPassword">{{
          "ResetPassword/PasswordRepeatLabel" | localize
        }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.passwordRepeat.$dirty && !$v.passwordRepeat.required"
          >{{ "ResetPassword/ErrorPasswordRepeat" | localize }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="
            $v.passwordRepeat.$dirty && !$v.passwordRepeat.sameAsPassword
          "
          >{{ "ResetPassword/ErrorPasswordRepeatMatch" | localize }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div class="center">
        <button
          type="submit"
          class="btn waves-effect waves-light auth-button blue"
        >
          {{ "ResetPassword/ButtonSubmit" | localize }}
        </button>
      </div>
    </div>
    <div id="modal1" class="modal" ref="modal">
      <div class="modal-content">
        <h4 class="center">{{ "ResetPassword/ModalMessage" | localize }}</h4>
      </div>
      <div class="modal-footer" style="text-align:center">
        <router-link to="/" class="modal-close waves-effect waves-light btn">
          {{ "ResetPassword/HomeLink" | localize }}</router-link
        >
      </div>
    </div>
  </form>
</template>

<script>
import unAuth from "@/mixins/unAuth.mixin.js"
import {
  required,
  minLength,
  sameAs,
  maxLength,
} from "vuelidate/lib/validators"
import {
  mustHaveDigit,
  mustHaveOnlyLettersAndDigits,
  mustHaveLowercase,
  mustHaveUppercase,
} from "@/utils/validators"
export default {
  mixins: [unAuth],
  data: () => ({
    password: "",
    passwordRepeat: "",
    loading: false,
    loadingCheck: false,
    isModalOpen: false,
  }),

  async mounted() {
    try {
      M.Modal.init(this.$refs.modal, {
        dismissible: false,
        endingTop: "35%",
      })
      this.loadingCheck = true
      const data = {
        resetId: this.$route.params.id,
        resetDate: this.$route.params.date,
      }
      const isConfirmed = await this.$store.dispatch("checkLink", data)
      if (isConfirmed) {
        this.loadingCheck = false
      } else {
        this.$router.push("/")
        this.$messageRed("Your password reset link appears to be invalid")
      }
    } catch (e) {}
  },
  updated() {
    if (this.$refs.modal && !M.Modal.getInstance(this.$refs.modal)) {
      M.Modal.init(this.$refs.modal, {
        dismissible: false,
        endingTop: "35%",
      })
    }
  },
  watch: {
    isModalOpen() {
      M.Modal.getInstance(this.$refs.modal).open()
    },
  },
  validations: {
    password: {
      required,
      mustHaveUppercase: mustHaveUppercase,
      mustHaveLowercase: mustHaveLowercase,
      mustHaveDigit: mustHaveDigit,
      mustNotHaveSpecial: mustHaveOnlyLettersAndDigits,
      minLength: minLength(8),
      maxLength: maxLength(128),
    },
    passwordRepeat: { sameAsPassword: sameAs("password"), required },
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        this.loading = true
        const data = {
          resetId: this.$route.params.id,
          resetDate: this.$route.params.date,
          password: this.password,
        }
        const isSuccess = await this.$store.dispatch("changePassword", data)
        if (!!isSuccess) {
          this.isModalOpen = true
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
.card-action small {
  display: inline-block;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

@include for-phone-only {
  #modal1 {
    height: 280px;
  }
}
</style>
