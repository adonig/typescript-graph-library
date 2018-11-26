import { Vertex } from './vertex'
import { Hashable } from '../hash/hashable'

export class Edge<V extends Vertex> implements Hashable {
  readonly source: V
  readonly target: V
  weight: number

  constructor(source: V, target: V, weight: number = 1) {
    this.source = source
    this.target = target
    this.weight = weight
  }

  get hashKey(): string {
    return `Edge(${this.source.hashKey}, ${this.target.hashKey}, ${this.weight})`
  }

  equals(other: Object): boolean {
    return (
      other instanceof Edge &&
      this.source === other.source &&
      this.target === other.target &&
      this.weight === other.weight
    )
  }

  reverse<E extends Edge<V>>(): E {
    return new Edge<V>(this.target, this.source, this.weight) as E
  }

  getOppositeVertex(v: V): V {
    if (this.source.equals(v)) {
      return this.target
    } else if (this.target.equals(v)) {
      return this.source
    } else {
      throw Error(`neither source nor target vertex: ${v}`)
    }
  }
}
