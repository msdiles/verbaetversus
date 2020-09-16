<template>
  <form class="card auth-card" @submit.prevent="handleSubmit">
    <div class="card-content">
      <span class="card-title center">Forgot your password?</span>
      <hr />
      <p>Enter your email</p>

      <div class="input-field">
        <input
          type="text"
          id="email"
          v-model="email"
          :class="{ invalid: $v.email.$dirty && !$v.email.required }"
        /><label label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >Enter email</small
        >
      </div>
    </div>
    <div class="card-action">
      <div class="center">
        <button
          type="submit"
          class="btn waves-effect waves-light auth-button blue"
        >
          Send password reset link
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators"

export default {
  data: () => ({
    email: "",
  }),
  validations: {
    email: { required },
  },
  methods: {
    handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      console.log("RESET")
    },
  },
}
</script>

<style lang="scss" scoped>
.card-panel {
  margin: 1.5rem auto 1.5rem;
  padding: 0.5rem;

  p {
    color: white;
  }
}
</style>
