import { Direction, LifeCycle } from './util'

type Point = number[]

type DirectionType =
  | Direction.Left
  | Direction.Right
  | Direction.Top
  | Direction.Bottom

interface BaseOptionsType {
  x: number
  y: number
}

type Handle<T> = (game: T, ...rest) => void

type EventType<L, T> = Record<L, Handle<T>[]>

export { Point, DirectionType, BaseOptionsType, Handle, EventType }
