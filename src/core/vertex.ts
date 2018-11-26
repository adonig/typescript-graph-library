import { Hashable } from '../hash/hashable'

export class Vertex implements Hashable {
  readonly id: number

  constructor(id: number) {
    this.id = id
  }

  get hashKey(): string {
    return `Vertex(${this.id})`
  }

  equals(other: Object): boolean {
    return other instanceof Vertex && this.id === other.id
  }
}
