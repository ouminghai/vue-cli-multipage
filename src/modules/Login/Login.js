import Vue from 'vue';
import Login from './Login.vue'


import iView from 'iview';
import 'iview/dist/styles/iview.css';    //
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data() {
    return {
      message: 'Hello user center!'
    };
  },
  components:{
    Login
  }

});
