import Vue from 'vue';
import Channel from './Channel.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    //

Vue.use(iView);
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#channel',
  data() {
    return {
      message: 'Hello user center!'
    };
  },
  components:{
    Channel
  }

});
