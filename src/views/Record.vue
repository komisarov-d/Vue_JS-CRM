<template>
  <div>
    <div class="page-title">
      <h3>{{'NewRecord' | localize}}</h3>
    </div>
    <loader v-if="loading"/>
    <p v-else-if="!categories.length">
     {{'NoCategories' | localize}}
      <router-link to="/categories">{{'AddNewCategory' | localize}}</router-link>
    </p>
    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
          >{{ c.title }}
          </option>
        </select>
        <label>{{'ChooseCategory' | localize}}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"

          />
          <span>{{'Income' | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              v-model="type"
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
          />
          <span>{{'Outcome' | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: (this.$v.amount.$dirty && !this.$v.amount.minValue)
             || (this.$v.amount.$dirty && !this.$v.amount.required)}"
        >
        <label for="amount">{{'Summary' | localize}}</label>
        <span class="helper-text invalid"
              v-if="this.$v.amount.$dirty && !this.$v.amount.minValue || this.$v.amount.$dirty && !this.$v.amount.required"
        >{{'MinValue'}} {{ $v.amount.$params.minValue.min }}</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: this.$v.description.$dirty && !this.$v.description.required}"
        >
        <label for="description">{{'Description' | localize}}</label>
        <span
            v-if="this.$v.description.$dirty && !this.$v.description.required"
            class="helper-text invalid">{{'EnterADescription' | localize}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Create' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
import {minValue, required} from "vuelidate/lib/validators";
import {mapGetters} from 'vuex'
import localizeFilter from "@/filters/localize.filter";

export default {
  name: 'Record',
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories")
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)


  },
  validations: {
    amount: {required, minValue: minValue(1)},
    description: {required}
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy
    }
  },
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {

      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', {bill})
          this.$message( localizeFilter('Message_CreateSuccess'))
          this.amount = 1
          this.description = ''
          this.$v.reset()
        } catch (e) {}
      } else {
        this.$message(`${localizeFilter('Message_NotEnoughMoney')} (${this.amount - this.info.bill})`)
      }
    }
  }
}
</script>
