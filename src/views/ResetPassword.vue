<template>
  <form class="card auth-card" @submit.prevent="handleSubmit">
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
      <div class="center">
        <button
          type="submit"
          class="btn waves-effect waves-light auth-button blue"
        >
          Reset Password
        </button>
      </div>
    </div>
  </form>
</template>

<script>
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
  data: () => ({
    password: "",
    passwordRepeat: "",
  }),
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
    handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card-action small {
  display: inline-block;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
