import Vue from 'vue';
import Channel from './Channel.vue'


import iView from 'iview';
import 'iview/dist/styles/iview.css';    //
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
  el: '#channel',
  data() {
    return {
      message: 'Hello user center!'
    };
  },
  components:{
    Login
  }

});
