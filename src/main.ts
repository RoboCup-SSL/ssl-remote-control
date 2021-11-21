import {createApp} from 'vue'
import App from './App.vue'
import router from './router';
import {ApiController} from './services/ApiController';

const apiController = new ApiController()

createApp(App)
    .use(router)
    .provide('api', apiController)
    .mount('#app')
