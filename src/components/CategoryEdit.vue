<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
                v-for="c of categories"
                :key="c.id"
                :value="c.id"
            >{{ c.title }}
            </option>
          </select>
          <label>{{'ChooseCategory' | localize}}</label>
        </div>

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
              :class="{invalid: (this.$v.limit.$dirty && !this.$v.limit.minValue)
              || (this.$v.limit.$dirty && !this.$v.limit.required)}"
          >
          <label for="limit">{{"Limit" | localize}}</label>
          <span
              v-if="this.$v.limit.$dirty && !this.$v.limit.minValue
              || this.$v.limit.$dirty && !this.$v.limit.required"
              class="helper-text invalid"
          >{{'MinValue' | localize}} {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Update' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>

import {minValue, required} from "vuelidate/lib/validators";
import localizeFilter from "@/filters/localize.filter";

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  validations: {
    title: {required},
    limit: {required, minValue: minValue(100)}
  },
  mounted() {
    M.updateTextFields()
    this.select = M.FormSelect.init(this.$refs.select)
  },
  watch: {
    current(catId) {
     const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  }
  ,
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy
    }
  },
  methods:{
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message(localizeFilter('Message_CategoryWasUpdated'))
        this.$emit('updated', categoryData)
      } catch (e) {
      }

    }
  }
}
</script>