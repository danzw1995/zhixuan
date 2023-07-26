import Snake from './snake'
import { BaseOptionsType, Point } from '../type'
import { getRandomPoint, isSamePoint } from '../util'

class Food {
  private options: BaseOptionsType
  private food: Point = []
  private score: number
  constructor(options: BaseOptionsType, snake: Snake) {
    this.options = options
    this.score = 0
    this.createFood(snake)
  }

  createFood(snakeC: Snake) {
    const { x, y } = this.options
    let food: Point
    const snake = snakeC.getSnake()

    while (true) {
      let isExistPoint = false
      food = getRandomPoint(x, y)
      for (let i = 0; i < snake.length; i++) {
        isExistPoint = isSamePoint(food, snake[i])
        if (isExistPoint) {
          break
        }
      }
      if (!isExistPoint) {
        break
      }
    }
    this.food = food
    this.score = 50
  }

  getFood(): Point {
    return this.food
  }

  getScore(): number {
    return this.score
  }

  beEaten() {
    this.food = []
  }
}

export default Food
