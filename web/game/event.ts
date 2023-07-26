import { EventType, Handle } from './type'

class BaseEvent<L, T> {
  private event: EventType<L, T>
  constructor() {
    this.event = {} as EventType<L, T>
  }
  on(name: L, handle: Handle<T>) {
    if (!this.event[name]) {
      this.event[name] = []
    }
    this.event[name].push(handle)
  }
  off(name: L, handle: Handle<T>) {
    const handles = this.getHandles(name)
    const index = handles.findIndex((h) => h === handle)
    if (index > 0) {
      handles.splice(index, 1)
    }
  }

  trigger(name: L, ...rest: any[]) {
    const handles = this.getHandles(name)
    handles.forEach((handle) => handle(this as unknown as T, ...rest))
  }

  getHandles(name: L) {
    if (!this.event[name]) {
      this.event[name] = []
    }
    return this.event[name]
  }

  clearEvent() {
    this.event = {} as EventType<L, T>
  }
}

export default BaseEvent
