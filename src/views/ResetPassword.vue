<template>
  <LoaderPage v-if="loadingCheck || isLoading || isLogged" />
  <form v-else class="card auth-card" @submit.prevent="handleSubmit">
    <div
      class="progress  blue lighten-4"
      style="margin:0;"
     v-visible="loading"
    >
      <div class="indeterminate blue"></div>
    </div>
    <div class="card-content">
      <span class="card-title center">Reset password</span>
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
        /><label label for="password">Password</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >Enter password</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          >Password must have at least
          {{ $v.password.$params.minLength.min }} letters
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.mustHaveUppercase"
          >Password must have at least one uppercase letter</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.mustHaveLowercase"
          >Password must have at least one lowercase letter</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.mustHaveDigit"
          >Password must have at least one digit character</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.mustNotHaveSpecial"
          >Password mustn't have any special characters</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.maxLength"
          >Your password can't be longer than
          {{ $v.password.$params.maxLength.max }} characters
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
        /><label label for="resetPassword">Confirm Password</label>
        <small
          class="helper-text invalid"
          v-if="$v.passwordRepeat.$dirty && !$v.passwordRepeat.required"
          >Repeat password</small
        >
        <small
          class="helper-text invalid"
          v-else-if="
            $v.passwordRepeat.$dirty && !$v.passwordRepeat.sameAsPassword
          "
          >Passwords don't match
        </small>
      </div>
    </div>
    <div class="card-action">
      <div class="center">
        <button
          type="submit"
          class="btn waves-effect waves-light auth-button blue"
        >
          Reset Password
        </button>
      </div>
    </div>
    <div id="modal1" class="modal" ref="modal">
      <div class="modal-content">
        <h4 class="center">Your password has been changed successfully</h4>
      </div>
      <div class="modal-footer" style="text-align:center">
        <router-link to="/" class="modal-close waves-effect waves-light btn"
          >Go To Home Page</router-link
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
        this.$message("Your password reset link appears to be invalid")
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
