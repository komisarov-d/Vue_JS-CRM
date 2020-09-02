<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
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
        >Поле Email не должно быть пустым</small>
        <small class="helper-text invalid"
               v-else-if="this.$v.email.$dirty && !this.$v.email.email"
        >Введите коректный Email </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: (this.$v.password.$dirty && !this.$v.password.required) || (this.$v.password.$dirty && !this.$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid"
               v-if="this.$v.password.$dirty && !this.$v.password.required"
        >Введите пароль</small>
        <small class="helper-text invalid"
               v-else-if="this.$v.password.$dirty && !this.$v.password.minLength"
        >Пароль не должен быть меньше {{ $v.password.$params.minLength.min }} символов </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: (this.$v.name.$dirty && !this.$v.name.required) || (this.$v.name.$dirty && !this.$v.name.minLength)}"

        >
        <label for="name">Имя</label>
        <small class="helper-text invalid"
               v-if="this.$v.name.$dirty && !this.$v.name.required"
        >Введите ваше имя</small>
        <small class="helper-text invalid"
               v-else-if="this.$v.name.$dirty && !this.$v.name.minLength"
        >Имя не должно быть меньше {{ $v.name.$params.minLength.min }} символов </small>
      </div>
      <p>
        <label>
          <input
              v-model.trim="agree"
              type="checkbox"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>

</template>
<script>
import {email, minLength, required} from "vuelidate/lib/validators";

export default {
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required, minLength: minLength(3)},
    agree: {checked: v => v}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData)
        await this.$router.push('/')
      } catch (e) {
      }

    }
  }
}
</script>
