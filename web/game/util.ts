import { DirectionType, Point } from './type'

export enum Direction {
  Left = 37,
  Top = 38,
  Right = 39,
  Bottom = 40,
}

export enum LifeCycle {
  Init = 'init',
  Update = 'update',
  Over = 'over',
  Destroy = 'destroy',
}

export const getRandom = (random: number): number => {
  return Math.floor(Math.random() * random)
}

export const getRandomPoint = (x: number, y: number): Point => {
  const randomX = getRandom(x)
  const randomY = getRandom(y)
  return [randomX, randomY]
}

export const isSamePoint = (point1: Point, point2: Point): boolean => {
  const [pointX, pointY] = point1
  const [headX, headY] = point2
  return pointX === headX && pointY === headY
}

export const isDirection = (direction: DirectionType): boolean => {
  return [
    Direction.Left,
    Direction.Bottom,
    Direction.Right,
    Direction.Top,
  ].includes(direction)
}
