
import { Vue, $, Common } from 'js/base'
import Channel from './Channel.vue'


/* eslint-disable no-new */
new Vue({
  el: '#channel',
  data() {
    return {
      message: 'Hello user center!'
    }
  },
  components:{
    Channel
  }
});
