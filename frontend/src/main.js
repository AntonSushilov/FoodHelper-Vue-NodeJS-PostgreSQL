import {createApp} from 'vue'
import Axios from 'axios'
// import Vuex from 'vuex'

import store from './store'
import App from '@/App.vue'
import router from '@/router/router'
import uiComponents from "@/ui"



const app = createApp(App)
app.config.globalProperties.$http = Axios;
app.config.globalProperties.tmp = "tmp variable";
app.config.globalProperties.$store = store;
const token = localStorage.getItem('token')
if (token) {
  app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}


uiComponents.forEach(component => {
  app.component(component.name, component)
});

app.use(store).use(router).mount('#app')
