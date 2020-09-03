import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate";
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from './utils/message.plugin'
import Loader from './components/app/Loader'
import currencyFilter from "@/filters/currency.filter";
import tooltipDirective from '@/directives/tooltip.directive'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
const firebase = require('firebase/app');
require('firebase/auth');
import Paginate from 'vuejs-paginate'
Vue.config.productionTip = false
Vue.component('paginate', Paginate)

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.filter('currency', currencyFilter)


firebase.initializeApp({
    apiKey: "AIzaSyB3fyTwxWu1ELpjdKZQwTZC05k2uooQIeE",
    authDomain: "vue-srm-c47db.firebaseapp.com",
    databaseURL: "https://vue-srm-c47db.firebaseio.com",
    projectId: "vue-srm-c47db",
    storageBucket: "vue-srm-c47db.appspot.com",
    messagingSenderId: "854435711536",
    appId: "1:854435711536:web:358305ee3967d0d3627bf5"
})
let app
firebase.default.auth().onAuthStateChanged(() => {
  if (!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

