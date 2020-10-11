<template>
  <LoaderPage v-if="isLoading || isLogged" />
  <form v-else class="card auth-card" @submit.prevent="handleSubmit">
    <div class="progress  blue lighten-4" style="margin:0;" v-visible="loading">
      <div class="indeterminate blue"></div>
    </div>
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
      <div v-if="!viewPassword" class="input-field">
        <input
          type="password"
          id="password"
          v-model="password"
          :class="{ invalid: $v.password.$dirty && !$v.password.required }"
        /><i
          class="material-icons"
          :class="{ active: viewPassword }"
          @click="viewPassword = !viewPassword"
          >remove_red_eye </i
        ><label label for="password">Password</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >Enter password</small
        >
      </div>

      <div v-else class="input-field">
        <input
          type="text"
          id="password"
          v-model="password"
          :class="{ invalid: $v.password.$dirty && !$v.password.required }"
        /><i
          class="material-icons"
          :class="{ active: viewPassword }"
          @click="viewPassword = !viewPassword"
          >remove_red_eye </i
        ><label label for="password">Password</label>
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
import unAuth from "@/mixins/unAuth.mixin.js"
export default {
  mixins: [unAuth],
  data: () => ({
    email: "",
    password: "",
    loading: false,
    viewPassword: false,
  }),
  validations: {
    email: { required },
    password: { required },
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
          email: this.email,
          password: this.password,
        }

        await this.$store.dispatch("signIn", data)
        this.$router.push("/?message=login")
      } catch (e) {
      } finally {
        this.loading = false
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

input[type="password"],
input[type="text"] {
  position: relative;

  & ~ i {
    position: absolute;
    top: 1rem;
    right: 1rem;
    opacity: 0.7;
    cursor: pointer;

    &.active:after {
      content: "";

      background-color: black;
      display: block;
      box-sizing: content-box;
      position: absolute;
      top: 0.1rem;
      left: 45%;
      width: 0.15rem;
      height: 1.5rem;
      transform: rotate(-45deg);

      transition: all 0.2s;
    }
    &.active:before {
      content: "";

      background-color: white;
      display: block;
      box-sizing: content-box;
      position: absolute;
      top: 0;
      left: 47%;
      width: 0.1rem;
      height: 1.5rem;
      transform: rotate(-45deg);
      transition: all 0.2s;
    }
  }
}
</style>
