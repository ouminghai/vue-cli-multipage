import Vue from 'vue';
import Index from './Index.vue'


import iView from 'iview';
import 'iview/dist/styles/iview.css';    //
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#index',
  data() {
    return {
      message: 'Hello user center!'
    };
  },
  components:{
    Index
  }

});
