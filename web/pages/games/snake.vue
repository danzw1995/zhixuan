<template>
  <div class="snake">
    <div class="snake-content">
      <div class="snake-map" :style="{width: x * 10 + 'px', height: y * 10 + 'px'}"></div>
      <!-- <div v-for="i in x" :key="i">
        <template v-for="j in y" :key="j">
          <div class="snake-map__item"></div>
        </template>
      </div> -->
      <div class="snake-snake">
        <div v-for="(point, index) in snake" :key="index" class="snake-snake__item snake-content__item" :style="{left: point[0] * 10 + 'px', top: point[1] * 10 + 'px' }">

        </div>
      </div>

      <div class="snake-food" v-if="food.length">
        <div  class="snake-food__item snake-content__item" :style="{left: food[0] * 10 + 'px', top: food[1] * 10 + 'px' }"></div>
      </div>
     
    </div>
    <div class="snake-tool">
      <el-button @click="initGame">开始游戏</el-button>
      <div>您的积分为: {{score}}</div>
      <div>当前已吃了: {{num}}个食物</div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { reactive } from 'vue';

import { LifeCycle } from '~~/game/util';
import Game from '../../game/greedySnake/game'


interface SnakeData {
  x: number,
  y: number,
  snake: any[],
  food: any[],
  num: number,
  score: number,
  initLength: number
}


const root: SnakeData = reactive({
   x: 40,
  y: 40,
  snake: [],
  food: [],
  score: 0,
  num: 0,
  initLength: 3
})

let game: Game;

   const  handleEvent = (e)  => {
      game.handleInput(e.keyCode);
    }

const update = (game: Game, ...rest: any) => {
      root.snake = game.getSnakeInstance().getSnake();
      root.food = game.getFoodInstance().getFood();
      root.score = game.getScore();
      root.num = root.snake.length - root.initLength - 1;
}

 const over  = (game: Game) => {
      console.log(game)
      game = null;
      document.removeEventListener('keydown', handleEvent)
    }

const initGame = () => {
      let _game = new Game({ x: root.x, y: root.y, initLength: root.initLength  });
      game = _game
      game.on(LifeCycle.Update, update)
      game.on(LifeCycle.Over, over)
      document.addEventListener('keydown', handleEvent);
      game.run();
}





// export default {
//   data() {
//     return {
//       x: 40,
//       y: 40,
//         snake: [],
//         food: [],
//         score: 0,
//         num: 0,
//         initLength: 3
//     }
//   },
//   methods: {
//     initGame() {
//       let game = null
//       game = new Game({ x: this.x, y: this.y, initLength: this.initLength  });
//       this.game = game;
//       game.on(LifeCycle.Update, this.update)
//       game.on(LifeCycle.Over, this.over)
//       document.addEventListener('keydown', this.handleEvent);
//       game.run();
//       // this.game.watch(this.update)
//     },
//     handleEvent(e)  {
//       this.game.handleInput(e.keyCode);
//     },
//     update(game: Game, ...rest: any) {
//       this.snake = game.snake.getSnake();
//       this.food = game.food.getFood();
//       this.score = game.score;
//       this.num = this.snake.length - this.initLength - 1;
//     },
//     over (game: Game) {
//       console.log(game)
//       this.game = null;
//       document.removeEventListener('keydown', this.handleEvent)
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.snake {
  display: flex;
  padding: 20px;

  &-content {
    display: flex;
    position: relative;
    &__item {
      width: 10px;
      height: 10px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
  }
  &-map {
    border: 1px solid #ccc;
  }
  &-tool {
    margin-top: 30px;
  }
  &-snake {
    &__item {
      position: absolute;
      background-color: red;
    }
  }
  &-food {
    &__item {
      position: absolute;
      background-color: palevioletred;
    }
  }
}
</style>
