<template>
  <form class="card auth-card" @submit.prevent="handleSubmit">
    <div class="card-content">
      <span class="card-title center">Sign In</span>
      <hr />

      <div class="input-field">
        <input
          type="text"
          id="login"
          v-model="email"
          :class="{ invalid: $v.email.$dirty && !$v.email.required }"
        /><label label for="login">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >Enter email</small
        >
      </div>
      <div class="input-field">
        <input
          type="text"
          id="password"
          v-model="password"
          :class="{ invalid: $v.password.$dirty && !$v.password.required }"
        /><label label for="password">Password</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >Enter password</small
        >
      </div>
    </div>
    <div class="card-action">
      <div class="center">
        <button
          type="submit"
          class="btn waves-effect waves-light auth-button blue"
        >
          Sign In
        </button>
        <small>
          Don't have an account?<router-link to="register">
            Sign Up</router-link
          >
        </small>
        <small>
          <router-link to="reset">Forgot password? </router-link>
        </small>
      </div>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators"
export default {
  data: () => ({ email: "", password: "" }),
  validations: {
    email: { required },
    password: { required },
  },
  methods:{
    handleSubmit(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }

      console.log("SING IN");
    }
  }
}
</script>

<style lang="scss" scoped>
.card-action small {
  display: inline-block;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
