<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model.trim="name"
            :class="{invalid: (this.$v.name.$dirty && !this.$v.name.required) || (this.$v.name.$dirty && !this.$v.name.minLength)}"

        >
        <label for="description">{{'Name' | localize}}</label>
        <small class="helper-text invalid"
               v-if="this.$v.name.$dirty && !this.$v.name.required"
        >{{"Message_EnterName" | localize}}</small>
        <small class="helper-text invalid"
               v-else-if="this.$v.name.$dirty && !this.$v.name.minLength"
        >Имя не должно быть меньше {{ $v.name.$params.minLength.min }} символов </small>
      </div>
      <div class="switch">
        <label>
          English
          <input v-model="isRuLocale" type="checkbox">
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
import {mapGetters, mapActions} from 'vuex'
import {minLength, required} from "vuelidate/lib/validators";

export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['info'])
  },
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    }, 0)

  },
  validations: {
    name: {required, minLength: minLength(3)},
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {
      }

    }
  }

}
</script>


<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>