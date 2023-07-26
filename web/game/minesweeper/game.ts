import { BaseOptionsType } from '../type'

import Flag from './flag'
import Mine from './mine'

interface GameOptionsType extends BaseOptionsType {}

class Game {
  private options: GameOptionsType
  private flag: Flag
  private mine: Mine
  constructor(options: GameOptionsType) {
    this.options = options
    this.flag = new Flag()
    this.mine = new Mine(options as any)
  }

  getFlagInstance() {
    return this.flag
  }

  getMineInstance() {
    return this.mine
  }
}

export default Game
