import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home.vue'
import ChangeKeeper from './views/ChangeKeeper.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/change-keeper',
            name: 'ChangeKeeper',
            component: ChangeKeeper
        },
    ]
})

export default router
