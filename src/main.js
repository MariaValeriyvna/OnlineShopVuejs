import Vue from 'vue';
// import App from './App.vue';
import { message1, message2 } from './data';
import Func from './func';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Func(message1, message2)),
}).$mount('#app');
