<template>
  <form class="card auth-card" @submit.prevent="handleSubmit">
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
              ($v.email.$dirty && !$v.email.maxLength),
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
          id="password"
          v-model="passwordRepeat"
          :class="{
            invalid:
              ($v.passwordRepeat.$dirty && !$v.passwordRepeat.required) ||
              ($v.passwordRepeat.$dirty && !$v.passwordRepeat.sameAsPassword),
          }"
        /><label label for="password">Confirm Password</label>
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
          class="btn waves-effect waves-light auth-button blue"
        >
          Sign Up
        </button>
      </div>
      <small class="center">
        Already have an account?<router-link to="login"> Sign In</router-link>
      </small>
    </div>
  </form>
</template>

<script>
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
  data: () => ({
    login: "",
    email: "",
    password: "",
    passwordRepeat: "",
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
  methods: {
    handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      console.log("SUBMIT")
    },
  },
}
</script>

<style lang="scss" scoped>
.card-action small {
  display: block;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
