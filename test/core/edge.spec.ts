import { Vertex } from '../../src/core/vertex'
import { Edge } from '../../src/core/edge'

describe('Edge', () => {
  let v1 = new Vertex(1)
  let v2 = new Vertex(2)
  let v3 = new Vertex(3)
  let e1: Edge<Vertex>
  let e2: Edge<Vertex>

  describe('.hashKey', () => {
    describe('when two edges have different source vertices', () => {
      beforeEach(() => {
        e1 = new Edge(v1, v3)
        e2 = new Edge(v2, v3)
      })

      it('should not be equal', () => {
        expect(e1.hashKey).not.toEqual(e2.hashKey)
      })
    })

    describe('when two edges have different target vertices', () => {
      beforeEach(() => {
        e1 = new Edge(v1, v2)
        e2 = new Edge(v1, v3)
      })

      it('should not be equal', () => {
        expect(e1.hashKey).not.toEqual(e2.hashKey)
      })
    })

    describe('when two vertices have the same source and target vertices', () => {
      beforeEach(() => {
        e1 = new Edge(v1, v2)
        e2 = new Edge(v1, v2)
      })

      it('should be equal', () => {
        expect(e1.hashKey).toEqual(e2.hashKey)
      })
    })

    describe('when two vertices have inverted source and target vertices', () => {
      beforeEach(() => {
        e1 = new Edge(v1, v2)
        e2 = new Edge(v2, v1)
      })

      it('should be false', () => {
        expect(e1.hashKey).not.toEqual(e2.hashKey)
      })
    })
  })

  describe('.equals', () => {
    describe('when two edges have different source vertices', () => {
      beforeEach(() => {
        e1 = new Edge(v1, v3)
        e2 = new Edge(v2, v3)
      })

      it('should be false', () => {
        expect(e1.equals(e2)).toBe(false)
      })
    })

    describe('when two edges have different target vertices', () => {
      beforeEach(() => {
        e1 = new Edge(v1, v2)
        e2 = new Edge(v1, v3)
      })

      it('should be false', () => {
        expect(e1.equals(e2)).toBe(false)
      })
    })

    describe('when two vertices have the same source and target vertices', () => {
      beforeEach(() => {
        e1 = new Edge(v1, v2)
        e2 = new Edge(v1, v2)
      })

      it('should be true', () => {
        expect(e1.equals(e2)).toBe(true)
      })
    })

    describe('when two vertices have inverted source and target vertices', () => {
      beforeEach(() => {
        e1 = new Edge(v1, v2)
        e2 = new Edge(v2, v1)
      })

      it('should be false', () => {
        expect(e1.equals(e2)).toBe(false)
      })
    })
  })

  describe('.reverse', () => {
    beforeEach(() => {
      e1 = new Edge(v1, v2)
      e2 = new Edge(v2, v1)
    })

    it('should swap the source and target vertices', () => {
      expect(e1.reverse().equals(e2)).toBe(true)
    })
  })

  describe('.getOppositeVertex', () => {
    beforeEach(() => {
      e1 = new Edge(v1, v2)
    })

    it('should return target when the argument is the source vertex', () => {
      expect(e1.getOppositeVertex(v1)).toBe(e1.target)
    })

    it('should return source when the argument is the target vertex', () => {
      expect(e1.getOppositeVertex(v2)).toBe(e1.source)
    })

    it('should throw an error when the argument is neither the source nor the target vertex', () => {
      expect(() => e1.getOppositeVertex(v3)).toThrow()
    })
  })
})
