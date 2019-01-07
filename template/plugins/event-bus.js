import Vue from 'vue'

const eventBus = {}

eventBus.install = (Vue) => {
  Vue.prototype.$bus = new Vue()
}

Vue.use(eventBus)
