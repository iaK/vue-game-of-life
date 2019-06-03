import GameOfLife from './GameOfLife.vue';

export default {
    install(Vue, options) {
        Vue.component('game-of-life', GameOfLife);
    }
};
