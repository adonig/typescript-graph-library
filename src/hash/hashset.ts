import { Hashable } from './hashable'

export class HashSet<T extends Hashable> implements Set<T> {
  static readonly EMPTY = Object.freeze(new HashSet())

  private readonly elementMap = new Map<string, T>()

  constructor(iterable?: Iterable<T>) {
    if (iterable) {
      for (const value of iterable) {
        this.add(value)
      }
    }
  }

  add(value: T): this {
    this.elementMap.set(value.hashKey, value)
    return this
  }

  clear(): void {
    this.elementMap.clear()
  }

  delete(value: T): boolean {
    return this.elementMap.delete(value.hashKey)
  }

  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    const self = this
    this.elementMap.forEach(value => {
      callbackfn.bind(thisArg)(value, value, self)
    })
  }

  has(value: T): boolean {
    return this.elementMap.has(value.hashKey)
  }

  get size(): number {
    return this.elementMap.size
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values()
  }

  *entries(): IterableIterator<[T, T]> {
    for (const value of this.elementMap.values()) {
      yield [value, value]
    }
  }

  keys(): IterableIterator<T> {
    return this.elementMap.values()
  }

  values(): IterableIterator<T> {
    return this.elementMap.values()
  }

  [Symbol.toStringTag]: 'Set'
}
