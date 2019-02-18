import Vue from 'vue'
import App from './App'
import 'common/stylus/index.styl'
import 'common/stylus/icon'
import store from './store'
Vue.config.productionTip = false;
Vue.prototype.$store = store;
App.mpType = 'app'
axios.defaults.adapter = function (config) {
    return new Promise ((resolve, reject) => {
        // console.log(config);
        wx.request({
            url: config.url, // 仅为示例，并非真实的接口地址,
            method:config.method,
            data: config.params,
            header: config.headers,
            success(res) {
                resolve(res.data);
            }
          })
    })
}
const app = new Vue(App)
app.$mount()
