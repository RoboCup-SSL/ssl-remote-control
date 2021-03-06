import {createRouter, createWebHistory} from 'vue-router'
import ControlButtons from './views/ControlButtons.vue'
import ChangeKeeper from './views/ChangeKeeper.vue'
import ConfirmChallengeFlag from './views/ConfirmChallengeFlag.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'ControlButtons',
            component: ControlButtons
        },
        {
            path: '/change-keeper',
            name: 'ChangeKeeper',
            component: ChangeKeeper
        },
        {
            path: '/confirm-challenge-flag',
            name: 'ConfirmChallengeFlag',
            component: ConfirmChallengeFlag
        },
    ]
})

export default router
