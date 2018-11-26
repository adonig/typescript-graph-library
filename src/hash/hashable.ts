export interface Hashable {
  readonly hashKey: string
  equals(other: Object): boolean
}
