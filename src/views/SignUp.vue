<template>
  <LoaderPage v-if="isLoading || isLogged" />
  <form v-else class="card auth-card" @submit.prevent="handleSubmit">
    <div
      class="progress  blue lighten-4"
      style="margin:0;"
      :style="{ visibility: loading ? 'visible' : 'hidden' }"
    >
      <div class="indeterminate blue"></div>
    </div>
    <div class="card-content">
      <span class="card-title center">Sign Up</span>
      <hr />

      <div class="input-field">
        <input
          type="text"
          id="login"
          v-model.trim="login"
          :class="{
            invalid:
              ($v.login.$dirty && !$v.login.required) ||
              ($v.login.$dirty && !$v.login.minLength) ||
              ($v.login.$dirty && !$v.login.maxLength),
          }"
        />
        <label label for="login">User name</label>
        <small
          class="helper-text invalid"
          v-if="$v.login.$dirty && !$v.login.required"
          >Enter login</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.login.$dirty && !$v.login.minLength"
          >Login must have at least
          {{ $v.login.$params.minLength.min }} characters
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.login.$dirty && !$v.login.maxLength"
          >Your login can't be longer than
          {{ $v.login.$params.maxLength.max }} characters
        </small>
      </div>

      <div class="input-field">
        <input
          type="text"
          id="email"
          v-model="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email) ||
              ($v.email.$dirty && !$v.email.maxLength) ||
              isUserExist,
          }"
        /><label label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >Enter email</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >Invalid email format
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.maxLength"
          >Your email can't be longer than
          {{ $v.email.$params.maxLength.max }} characters
        </small>
        <small class="helper-text invalid" v-else-if="isUserExist"
          >User with this email already exists
        </small>
      </div>

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
          id="passwordRepeat"
          v-model="passwordRepeat"
          :class="{
            invalid:
              ($v.passwordRepeat.$dirty && !$v.passwordRepeat.required) ||
              ($v.passwordRepeat.$dirty && !$v.passwordRepeat.sameAsPassword),
          }"
        /><label label for="passwordRepeat">Confirm Password</label>
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
      <div>
        <button
          type="submit"
          class="btn waves-effect waves-light auth-button blue "
          :class="{ disabled: loading }"
        >
          Sign Up
        </button>
      </div>
      <small class="center">
        Already have an account?<router-link to="login"> Sign In</router-link>
      </small>
    </div>
    <div id="modal1" class="modal" ref="modal">
      <div class="modal-content">
        <h4 class="center">Registration completed successfully</h4>
      </div>
      <div class="modal-footer" style="text-align:center">
        <router-link to="/" class="modal-close waves-effect waves-light btn"
          >Go To Home Page</router-link
        >
        <router-link
          to="/login"
          class="modal-close waves-effect waves-light btn"
          >Go To Login Page</router-link
        >
      </div>
    </div>
  </form>
</template>

<script>
import unAuth from "@/mixins/unAuth.mixin.js"
import {
  email,
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
    login: "",
    email: "",
    password: "",
    passwordRepeat: "",
    isUserExist: false,
    loading: false,
    isModalOpen: false,
  }),
  validations: {
    login: { required, minLength: minLength(6), maxLength: maxLength(128) },
    email: { required, email, maxLength: maxLength(128) },
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
    async checkIsUserExist() {
      try {
        this.loading = true
        const data = { email: this.email }
        this.isUserExist = await this.$store.dispatch("checkEmail", data)
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    async handleSubmit() {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        await this.checkIsUserExist()

        if (this.isUserExist || this.isUserExist === undefined) return

        const data = {
          email: this.email,
          password: this.password,
          login: this.login,
        }
        this.loading = true
        const success = await this.$store.dispatch("signUp", data)
        this.isModalOpen = !!success ? true : false
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
  display: block;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

@include for-phone-only {
  #modal1 {
    height: 280px;
  }
}
</style>
