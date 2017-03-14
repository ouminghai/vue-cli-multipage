

import { Vue, $, Common } from 'js/base'
import Login from './Login.vue'


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
