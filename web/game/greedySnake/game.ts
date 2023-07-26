import { BaseOptionsType, DirectionType } from '../type'
import Snake from './snake'
import Food from './food'
import { Direction, isDirection, LifeCycle } from '../util'
import BaseEvent from '../event'

interface GameOptionsType extends BaseOptionsType {
  initLength: number
}

class Game extends BaseEvent<LifeCycle, Game> {
  private options: BaseOptionsType
  private snake: Snake
  private food: Food
  private score: number
  private timer: NodeJS.Timeout
  private speed: number
  private speedItem: number
  constructor(options: GameOptionsType) {
    super()
    this.options = options
    this.snake = new Snake({ ...options })
    this.food = new Food(options, this.snake)
    this.score = 0
    this.timer = null as unknown as NodeJS.Timeout
    this.speed = 100
    this.speedItem = 20
  }

  run() {
    this.timer = setTimeout(() => {
      this.snake.move(this, this.food)
      if (this.isOver()) {
        clearTimeout(this.timer)
        this.over()
        return
      }
      this.trigger(LifeCycle.Update)
      this.run()
    }, this.speed)
  }

  handleInput = (direction: DirectionType) => {
    const snakeDirection = this.snake.getDirection()

    // 改变方向
    if (isDirection(direction) && direction !== snakeDirection) {
      const horizontal = [Direction.Left, Direction.Right]
      const vertical = [Direction.Top, Direction.Bottom]
      if (
        (horizontal.includes(snakeDirection) && !horizontal.includes(direction)) ||
        (vertical.includes(snakeDirection) && !vertical.includes(direction))
      ) {
        clearTimeout(this.timer)
        this.snake.changeDirection(direction)
        this.run()
      }
    }
  }

  increment(fd: Food) {
    this.score += fd.getScore()

    if ((this.snake.getSnake().length - 1) % 10 === 0) {
      if (this.speed - this.speedItem > 40) {
        this.speed -= this.speedItem
      } else {
        this.speed = 40
      }
    }
  }

  over() {
    this.trigger(LifeCycle.Over)
    this.destroy()
  }

  destroy() {
    this.clearEvent()
    this.snake = null as unknown as Snake
    this.score = 0
    this.food = null as unknown as Food
    clearTimeout(this.timer)
    this.trigger(LifeCycle.Destroy)
  }

  isOver() {
    return this.snake.isDie()
  }

  getFoodInstance() {
    return this.food
  }

  getSnakeInstance() {
    return this.snake
  }

  getScore() {
    return this.score
  }
}

export default Game
