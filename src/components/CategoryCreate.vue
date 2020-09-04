<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Create'| localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: this.$v.title.$dirty && !this.$v.title.required}"
          >
          <label for="name">{{'Name' | localize}}</label>
          <span
              v-if="this.$v.title.$dirty && !this.$v.title.required"
              class="helper-text invalid"
          >{{'Message_EnterCategoryName' | localize}}</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: (this.$v.limit.$dirty && !this.$v.limit.minValue) || (this.$v.limit.$dirty && !this.$v.limit.required)}"
          >
          <label for="limit">{{'Limit' | localize}}</label>
          <span
              v-if="this.$v.limit.$dirty && !this.$v.limit.minValue || this.$v.limit.$dirty && !this.$v.limit.required"
              class="helper-text invalid"
          >{{'MinValue' | localize}} {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Create' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import {required, minValue} from 'vuelidate/lib/validators'
import localizeFilter from "@/filters/localize.filter";
export default {
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: {required},
    limit: {required, minValue: minValue(100)}
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 100
        this.$v.$reset()
        this.$message(localizeFilter('Message_CategoryWasCreated'))
        this.$emit('created', category)
      } catch (e) {
      }

    }
  }
}
</script>