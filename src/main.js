// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入axios加载数据，导入之前需要先安装axios（在项目根目录下执行命令 npm install axios --save-dev）
import axios from 'axios'

// 将axios改写为Vue的原型属性，后面使用$http.get()或者$http.post()方式加载数据
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // data:{
  //   eventHub:new Vue() //新建一个名为evenHub的空vue对象，可以在任意一个组件内调用事件触发方法
  // }
})
