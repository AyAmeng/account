import Component from 'vue-class-component'
import './style.scss'

@Component({
  name: 'app',
  template: require('./template.html'),

  data: () => ({
    currentRouter: 'Movies',
    shouldShow: true
  })
})

export default class AppView {

  mounted () {
    // 路由钩子函数
    console.info('init success')
  }
}
