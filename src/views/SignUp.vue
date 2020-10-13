<template>
  <LoaderPage v-if="isLoading || isLogged" />
  <form v-else class="card auth-card" @submit.prevent="handleSubmit">
    <div
      class="progress  blue lighten-4"
      style="margin:0;"
     v-visible="loading"
    >
      <div class="indeterminate blue"></div>
    </div>
    <div class="card-content">
      <span class="card-title center">{{
        "SignUp/Title" | localize
      }}</span>
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
        <label label for="login">{{
        "SignUp/LoginLabel" | localize
      }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.login.$dirty && !$v.login.required"
          >{{
        "SignUp/ErrorLogin" | localize
      }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.login.$dirty && !$v.login.minLength"
          >{{
        "SignUp/ErrorLoginLengthStart" | localize
      }}
          {{ $v.login.$params.minLength.min }}{{
        "SignUp/ErrorLoginLengthEnd" | localize
      }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.login.$dirty && !$v.login.maxLength"
          >{{
        "SignUp/ErrorLoginLengthMaxStart" | localize
      }}
          {{ $v.login.$params.maxLength.max }}{{
        "SignUp/ErrorLoginLengthMaxEnd" | localize
      }}
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
        /><label label for="email">{{
        "SignUp/EmailLabel" | localize
      }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >{{
        "SignUp/ErrorEmail" | localize
      }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >{{
        "SignUp/ErrorEmailInvalid" | localize
      }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.maxLength"
          >{{
        "SignUp/ErrorEmailLengthMaxStart" | localize
      }}
          {{ $v.email.$params.maxLength.max }}{{
        "SignUp/ErrorEmailLengthMaxEnd" | localize
      }}
        </small>
        <small class="helper-text invalid" v-else-if="isUserExist"
          >{{
        "SignUp/ErrorEmailExists" | localize
      }}
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
        /><label label for="password">{{
        "SignUp/PasswordLabel" | localize
      }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >{{
        "SignUp/ErrorPassword" | localize
      }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          >{{
        "SignUp/ErrorPasswordLengthStart" | localize
      }}
          {{ $v.password.$params.minLength.min }}{{
        "SignUp/ErrorPasswordLengthEnd" | localize
      }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.mustHaveUppercase"
          >{{
        "SignUp/ErrorPasswordUppercase" | localize
      }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.mustHaveLowercase"
          >{{
        "SignUp/ErrorPasswordLowercase" | localize
      }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.mustHaveDigit"
          >{{
        "SignUp/ErrorPasswordDigit" | localize
      }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.mustNotHaveSpecial"
          >{{
        "SignUp/ErrorPasswordSpecial" | localize
      }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.maxLength"
          >{{
        "SignUp/ErrorPasswordLengthMaxStart" | localize
      }}
          {{ $v.password.$params.maxLength.max }}{{
        "SignUp/ErrorPasswordLengthMaxEnd" | localize
      }}
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
        /><label label for="passwordRepeat">{{
        "SignUp/PasswordRepeatLabel" | localize
      }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.passwordRepeat.$dirty && !$v.passwordRepeat.required"
          >{{
        "SignUp/ErrorPasswordRepeat" | localize
      }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="
            $v.passwordRepeat.$dirty && !$v.passwordRepeat.sameAsPassword
          "
          >{{
        "SignUp/ErrorPasswordRepeatMatch" | localize
      }}
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
          {{
        "SignUp/ButtonSubmit" | localize
      }}
        </button>
      </div>
      <small class="center">
        {{
        "SignUp/HaveAccount" | localize
      }}<router-link to="login">{{
        "SignUp/HaveAccountLink" | localize
      }}</router-link>
      </small>
    </div>
    <div id="modal1" class="modal" ref="modal">
      <div class="modal-content">
        <h4 class="center">{{
        "SignUp/ModalTitle" | localize
      }}</h4>
      </div>
      <div class="modal-footer" style="text-align:center">
        <router-link to="/" class="modal-close waves-effect waves-light btn"
          >{{
        "SignUp/HomeLink" | localize
      }}</router-link
        >
        <router-link
          to="/login"
          class="modal-close waves-effect waves-light btn"
          >{{
        "SignUp/LoginLink" | localize
      }}</router-link
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
