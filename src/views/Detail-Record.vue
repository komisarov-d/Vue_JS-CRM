<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ 'History' | localize }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.typeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card " :class="record.typeClass">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>{{ 'Summary' | localize }}: {{ record.amount | currency }}</p>
              <p>{{ 'Categories' | localize }}: {{ record.categoryName }}</p>

              <small> {{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">{{ 'NoRecord' | localize }}</p>
  </div>
</template>

<script>

import localizeFilter from "@/filters/localize.filter";

export default {
  name: 'Detail-record',
  metaInfo() {
    return {
      title: this.$title('History')
    }
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    const typeClass = record.type === 'income' ? 'green' : 'red'
    const typeText = record.type === 'income' ? localizeFilter('Income') :  localizeFilter('Outcome')
    this.record = {
      ...record,
      categoryName: category.title,
      typeClass, typeText
    }

    this.loading = false
  }
}
</script>
