
import { Vue, $, Common } from 'js/base'
import Index from './Index.vue'


/* eslint-disable no-new */
new Vue({
  el: '#index',
  data() {
    return {
      message: 'Hello user center!'
    }
  },
  components:{
    Index
  }

});
