import Vue from 'vue'
import App from './views/login/index'
import Component from 'vue-class-component'
import ElementUI from 'element-ui'
import './style/index'

Vue.config.productionTip = false
/* eslint-disable no-new */

@Component({
  //router,
  // store,
  template: '<App/>',
  components: { App }
})

export class AppView extends Vue {
  name = 'appView'
}

export default new AppView({
  el: '#app'
})
