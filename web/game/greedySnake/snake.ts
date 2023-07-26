import { Point, DirectionType, BaseOptionsType } from '../type'
import { getRandom, getRandomPoint, Direction, isSamePoint } from '../util'
import Food from './food'
import Game from './game'

interface OptionsType extends BaseOptionsType {
  initLength: number
}

class Snake {
  private options: OptionsType
  private snake: Point[]
  private direction: DirectionType
  private snakeHead: Point
  constructor(options: OptionsType) {
    this.options = options
    this.snake = []
    this.direction = Direction.Right
    this.snakeHead = []
    this.init()
  }
  init() {
    const head = this.initHead()
    const body = this.initBody(head)
    this.snakeHead = head
    this.snake = [head, ...body]
  }
  initHead(): Point {
    const { x, y } = this.options
    const [headX, headY] = getRandomPoint(x - 1, y - 1)
    this.snake.push([headX, headY])
    return [headX, headY]
  }
  initBody(head: Point): Point[] {
    const { x, y, initLength } = this.options
    const [headX, headY] = head
    const directions: DirectionType[] = []
    // 是否能向上生成蛇身
    if (headX - initLength) {
      directions.push(Direction.Top)
    }
    // 向下
    if (headX + initLength < x - 1) {
      directions.push(Direction.Bottom)
    }
    // 向左
    if (headY - initLength) {
      directions.push(Direction.Left)
    }
    // 向右
    if (headY + initLength < y - 1) {
      directions.push(Direction.Right)
    }

    // 随机选一个方向
    const direction = directions[getRandom(directions.length)]
    const [incrementX, incrementY] = this.getIncrement(direction)

    const bodys: Point[] = []

    for (let i = 0; i < initLength; i++) {
      const j = i + 1
      bodys.push([headX + -incrementX * j, headY + -incrementY * j])
    }
    this.direction = direction
    return bodys
  }

  changeDirection(direction: DirectionType) {
    this.direction = direction
  }

  getIncrement(direction: DirectionType): Point {
    let incrementX = 0
    let incrementY = 0

    switch (direction) {
      case Direction.Top:
        incrementX = 0
        incrementY = -1
        break
      case Direction.Bottom:
        incrementX = 0
        incrementY = 1
        break
      case Direction.Left:
        incrementX = -1
        incrementY = 0
        break
      case Direction.Right:
        incrementX = 1
        incrementY = 0
    }
    return [incrementX, incrementY]
  }

  getHead(): Point {
    return this.snakeHead
  }

  getSnake(): Point[] {
    return this.snake
  }

  getDirection(): DirectionType {
    return this.direction
  }

  eat(food: Point) {
    this.snakeHead = food
    this.snake.unshift(this.snakeHead)
  }

  move(game: Game, fd: Food): boolean {
    const direction = this.direction
    const snakeHead = this.snakeHead
    const snake = this.snake
    const [incrementX, incrementY] = this.getIncrement(direction)
    const [headX, headY] = snakeHead

    const newHead: Point = [headX + incrementX, headY + incrementY]
    const newSnake: Point[] = [newHead]
    const food = fd.getFood()

    if (isSamePoint(food, newHead)) {
      this.eat(food)
      game.increment(fd)
      fd.createFood(this)
      return true
    }

    for (let i = 0; i < snake.length - 1; i++) {
      newSnake.push(snake[i])
    }

    this.snakeHead = newHead
    this.snake = newSnake
    return false
  }

  destroy() {
    this.direction = Direction.Right
    this.snake = []
    this.snakeHead = []
  }

  isDie(): boolean {
    const [headX, headY] = this.snakeHead
    const snake = this.snake
    const { x, y } = this.options
    // 越过边界检测
    if (headX < 0 || headX >= x || headY < 0 || headY >= y) {
      return true
    }
    // 蛇头与蛇身碰撞检测
    for (let i = 1; i < snake.length; i++) {
      if (isSamePoint(this.snakeHead, snake[i])) {
        return true
      }
    }
    return false
  }

  isHead(point: Point): boolean {
    return isSamePoint(point, this.snakeHead)
  }
}

export default Snake
