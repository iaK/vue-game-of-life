import GameOfLife from './GameOfLife.vue'

export function install(Vue, options) {
        Vue.component('game-of-life', GameOfLife);
};

export default GameOfLife;

