<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'HomeBookkeeping' | localize}}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: (this.$v.email.$dirty && !this.$v.email.required) || (this.$v.email.$dirty && !this.$v.email.email)}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid"
               v-if="this.$v.email.$dirty && !this.$v.email.required"
        >{{'Message_NoEmail' | localize}}</small>
        <small class="helper-text invalid"
               v-else-if="this.$v.email.$dirty && !this.$v.email.email"
        >{{'Message_InvalidEmail' | localize}} </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: (this.$v.password.$dirty && !this.$v.password.required) || (this.$v.password.$dirty && !this.$v.password.minLength)}"
        >
        <label for="password">{{'Password' | localize}}</label>
        <small class="helper-text invalid"
               v-if="this.$v.password.$dirty && !this.$v.password.required"
        >{{'Message_EnterPassword' | localize}}</small>
        <small class="helper-text invalid"
               v-else-if="this.$v.password.$dirty && !this.$v.password.minLength"
        >Пароль не должен быть меньше {{ $v.password.$params.minLength.min }} символов </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '../utils/messages'
import localizeFilter from "@/filters/localize.filter";

export default {
  name: 'Login',
  metaInfo() {
    return {
      title: this.$title('login')
    }
  },
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(localizeFilter(messages[this.$route.query.message]))

    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        await this.$router.push('/')
      } catch(e){

      }

    }
  }
}
</script>
