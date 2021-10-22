import Vue from 'vue'

import 'normalize.css/normalize.css' // 一个现代的替代CSS重置

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // 公共 css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 权限控制

/**
 * 如果您不想使用模拟服务器
 * 你想使用MockJs进行模拟api
 * 可以执行:mockXHR()
 *
 * 目前，MockJs将在生产环境中使用，
 * 请在上线前将其删除 ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
