import { BaseOptionsType, Point } from '../type'
import { getRandomPoint } from '../util'

interface MineOptionsType extends BaseOptionsType {
  number: number
}

class Mine {
  private mines: Point[]
  private options: MineOptionsType
  constructor(options: MineOptionsType) {
    this.options = options
    this.mines = []
    this.init()
  }

  init() {
    let { x, y, number } = this.options

    const list = []
    const map: Record<string, boolean> = {}

    while (number) {
      const point = getRandomPoint(x, y)
      const key = point.join(',')
      if (map[key]) {
        continue
      }
      map[key] = true
      list.push(point)
      number--
    }

    this.mines = list
  }
}

export default Mine
