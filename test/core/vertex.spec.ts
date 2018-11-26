import { Vertex } from '../../src/core/vertex'

describe('Vertex', () => {
  let v1: Vertex
  let v2: Vertex

  describe('.hashKey', () => {
    describe('when two vertices have different ids', () => {
      beforeEach(() => {
        v1 = new Vertex(1)
        v2 = new Vertex(2)
      })

      it('should not be equal', () => {
        expect(v1.hashKey).not.toEqual(v2.hashKey)
      })
    })

    describe('when two vertices have the same ids', () => {
      beforeEach(() => {
        v1 = new Vertex(1)
        v2 = new Vertex(1)
      })

      it('should be equal', () => {
        expect(v1.hashKey).toEqual(v2.hashKey)
      })
    })
  })

  describe('.equals', () => {
    describe('when two vertices have different ids', () => {
      beforeEach(() => {
        v1 = new Vertex(1)
        v2 = new Vertex(2)
      })

      it('should be false', () => {
        expect(v1.equals(v2)).toBe(false)
      })
    })

    describe('when two vertices have the same ids', () => {
      beforeEach(() => {
        v1 = new Vertex(1)
        v2 = new Vertex(1)
      })

      it('should be true', () => {
        expect(v1.equals(v2)).toBe(true)
      })
    })
  })
})
