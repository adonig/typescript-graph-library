import { Edge } from '../../src/core/edge'
import { Graph } from '../../src/core/graph'
import { Vertex } from '../../src/core/vertex'
import { HashSet } from '../../src/hash/hashset'

describe('Graph', () => {
  let source: Vertex
  let target: Vertex
  let edge1: Edge<Vertex>
  let edge2: Edge<Vertex>
  let graph: Graph<Vertex, Edge<Vertex>>

  beforeEach(() => {
    source = new Vertex(1)
    target = new Vertex(2)
    edge1 = new Edge(source, target)
    edge2 = new Edge(target, source)
    graph = new Graph<Vertex, Edge<Vertex>>()
  })

  describe('.containsVertex', () => {
    describe('when the graph does not contain the vertex', () => {
      it('should return false', () => {
        expect(graph.containsVertex(source)).toBe(false)
      })
    })

    describe('when the graph does contain the vertex', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return true', () => {
        expect(graph.containsVertex(source)).toEqual(true)
      })
    })
  })

  describe('.containsEdge', () => {
    describe('when the graph does not contain the edge', () => {
      it('should return false', () => {
        expect(graph.containsEdge(edge1)).toBe(false)
      })
    })

    describe('when the graph does contain the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return true', () => {
        expect(graph.containsEdge(edge1)).toEqual(true)
      })
    })
  })

  describe('.getAllEdges', () => {
    describe('when the graph does not contain the source vertex', () => {
      beforeEach(() => {
        graph.addVertex(target)
      })

      it('should return undefined', () => {
        expect(graph.getAllEdges(source, target)).toBe(undefined)
      })
    })

    describe('when the graph does not contain the target vertex', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return undefined', () => {
        expect(graph.getAllEdges(source, target)).toBe(undefined)
      })
    })

    describe('when the graph contains source and target but not the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
      })

      it('should return an empty hashset', () => {
        expect(graph.getAllEdges(source, target)).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return a hashset containing the edge', () => {
        expect(graph.getAllEdges(source, target)).toEqual(new HashSet<Edge<Vertex>>([edge1]))
      })
    })
  })

  describe('.getEdge', () => {
    describe('when the graph does not contain the source vertex', () => {
      beforeEach(() => {
        graph.addVertex(target)
      })

      it('should return undefined', () => {
        expect(graph.getEdge(source, target)).toBe(undefined)
      })
    })

    describe('when the graph does not contain the target vertex', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return undefined', () => {
        expect(graph.getEdge(source, target)).toBe(undefined)
      })
    })

    describe('when the graph does contain source and target but not the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
      })

      it('should return undefined', () => {
        expect(graph.getEdge(source, target)).toBe(undefined)
      })
    })

    describe('when the graph does contain the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return the edge', () => {
        expect(graph.getEdge(source, target)).toBe(edge1)
      })
    })
  })

  describe('.addEdge', () => {
    describe('when the graph does not contain the source vertex', () => {
      beforeEach(() => {
        graph.addVertex(target)
      })

      it('should throw an error', () => {
        expect(() => graph.addEdge(edge1)).toThrow()
      })
    })

    describe('when the graph does not contain the target vertex', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should throw an error', () => {
        expect(() => graph.addEdge(edge1)).toThrow()
      })
    })

    describe('when the graph does contain the source and the target vertex', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
      })

      it('should return true', () => {
        expect(graph.addEdge(edge1)).toEqual(true)
      })
    })

    describe('when the graph does contain the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return false', () => {
        expect(graph.addEdge(edge1)).toEqual(false)
      })
    })
  })

  describe('.addVertex', () => {
    describe('when the graph does not contain the vertex', () => {
      it('should return true', () => {
        expect(graph.addVertex(source)).toBe(true)
      })
    })

    describe('when the graph does contain the vertex', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return false', () => {
        expect(graph.addVertex(source)).toEqual(false)
      })
    })
  })

  describe('.edgeSet', () => {
    describe('when the graph does not contain the edge', () => {
      it('should return an empty hashset', () => {
        expect(graph.edgeSet()).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return a hashset containing the edge', () => {
        expect(graph.edgeSet()).toEqual(new HashSet<Edge<Vertex>>([edge1]))
      })
    })
  })

  describe('.vertexSet', () => {
    describe('when the graph does not contain the vertex', () => {
      it('should return an empty hashset', () => {
        expect(graph.vertexSet()).toEqual(new HashSet<Vertex>())
      })
    })

    describe('when the graph does contain the vertex', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return a hashset containing the edge', () => {
        expect(graph.vertexSet()).toEqual(new HashSet<Vertex>([source]))
      })
    })
  })

  describe('.incomingEdgesOf', () => {
    describe('when the graph does not contain the vertex', () => {
      it('should return an empty hashset', () => {
        expect(graph.incomingEdgesOf(source)).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain the vertex but no edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return an empty hashset', () => {
        expect(graph.incomingEdgesOf(source)).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain an edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return an empty hashset for the source of the edge', () => {
        expect(graph.incomingEdgesOf(source)).toEqual(HashSet.EMPTY)
      })

      it('should return a hashset containing the edge for the target of the edge', () => {
        expect(graph.incomingEdgesOf(target)).toEqual(new HashSet<Edge<Vertex>>([edge1]))
      })
    })
  })

  describe('.inDegreeOf', () => {
    describe('when the graph does not contain the vertex', () => {
      it('should return zero', () => {
        expect(graph.inDegreeOf(source)).toBe(0)
      })
    })

    describe('when the graph does contain the vertex but no edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return zero', () => {
        expect(graph.inDegreeOf(source)).toBe(0)
      })
    })

    describe('when the graph does contain an edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return zero for the source of the edge', () => {
        expect(graph.inDegreeOf(source)).toBe(0)
      })

      it('should return one for the target of the edge', () => {
        expect(graph.inDegreeOf(target)).toBe(1)
      })
    })
  })

  describe('.outgoingEdgesOf', () => {
    describe('when the graph does not contain the vertex', () => {
      it('should return an empty hashset', () => {
        expect(graph.outgoingEdgesOf(source)).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain the vertex but no edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return an empty hashset', () => {
        expect(graph.outgoingEdgesOf(source)).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain an edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return a hashset containing the edge for the source of the edge', () => {
        expect(graph.outgoingEdgesOf(source)).toEqual(new HashSet<Edge<Vertex>>([edge1]))
      })

      it('should return an empty hashset for the target of the edge', () => {
        expect(graph.outgoingEdgesOf(target)).toEqual(HashSet.EMPTY)
      })
    })
  })

  describe('.outDegreeOf', () => {
    describe('when the graph does not contain the vertex', () => {
      it('should return zero', () => {
        expect(graph.outDegreeOf(source)).toBe(0)
      })
    })

    describe('when the graph does contain the vertex but no edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return zero', () => {
        expect(graph.outDegreeOf(source)).toBe(0)
      })
    })

    describe('when the graph does contain an edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return one for the source of the edge', () => {
        expect(graph.outDegreeOf(source)).toBe(1)
      })

      it('should return zero for the target of the edge', () => {
        expect(graph.outDegreeOf(target)).toBe(0)
      })
    })
  })

  describe('.removeEdgeBetween', () => {
    describe('when the graph does not contain the source vertex', () => {
      beforeEach(() => {
        graph.addVertex(target)
      })

      it('should return undefined', () => {
        expect(graph.removeEdgeBetween(source, target)).toBe(undefined)
      })
    })

    describe('when the graph does not contain the target vertex', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return undefined', () => {
        expect(graph.removeEdgeBetween(source, target)).toBe(undefined)
      })
    })

    describe('when the graph does contain source and target but not the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
      })

      it('should return undefined', () => {
        expect(graph.removeEdgeBetween(source, target)).toBe(undefined)
      })
    })

    describe('when the graph does contain the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return the edge', () => {
        expect(graph.removeEdgeBetween(source, target)).toBe(edge1)
      })
    })
  })

  describe('.removeEdge', () => {
    describe('when the graph does not contain the source vertex', () => {
      beforeEach(() => {
        graph.addVertex(target)
      })

      it('should return false', () => {
        expect(graph.removeEdge(edge1)).toBe(false)
      })
    })

    describe('when the graph does not contain the target vertex', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return false', () => {
        expect(graph.removeEdge(edge1)).toBe(false)
      })
    })

    describe('when the graph does contain source and target but not the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
      })

      it('should return false', () => {
        expect(graph.removeEdge(edge1)).toBe(false)
      })
    })

    describe('when the graph does contain the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return the edge', () => {
        expect(graph.removeEdge(edge1)).toBe(true)
      })
    })
  })

  describe('.removeVertex', () => {
    describe('when the graph does not contain the vertex', () => {
      it('should return false', () => {
        expect(graph.removeVertex(source)).toBe(false)
      })
    })

    describe('when the graph does contain the vertex', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return true', () => {
        expect(graph.removeVertex(source)).toBe(true)
      })
    })
  })

  describe('.removeAllEdges', () => {
    describe('when the graph does not contain an edge', () => {
      it('should return false', () => {
        expect(graph.removeAllEdges([edge1])).toBe(false)
      })
    })

    describe('when the graph does contain an edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return true', () => {
        expect(graph.removeAllEdges([edge1])).toBe(true)
      })
    })
  })

  describe('.removeAllEdgesBetween', () => {
    describe('when the graph does not contain the source vertex', () => {
      beforeEach(() => {
        graph.addVertex(target)
      })

      it('should return undefined', () => {
        expect(graph.removeAllEdgesBetween(source, target)).toBe(undefined)
      })
    })

    describe('when the graph does not contain the target vertex', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return undefined', () => {
        expect(graph.removeAllEdgesBetween(source, target)).toBe(undefined)
      })
    })

    describe('when the graph does contain source and target but not the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
      })

      it('should return an empty hashset', () => {
        expect(graph.removeAllEdgesBetween(source, target)).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain the edge', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
        graph.addEdge(edge1)
      })

      it('should return a hashset containing the edge', () => {
        expect(graph.removeAllEdgesBetween(source, target)).toEqual(
          new HashSet<Edge<Vertex>>([edge1])
        )
      })
    })
  })

  describe('.removeAllVertices', () => {
    describe('when the graph does not contain a vertex', () => {
      it('should return false', () => {
        expect(graph.removeAllVertices([source, target])).toBe(false)
      })
    })

    describe('when the graph does contain a vertex', () => {
      beforeEach(() => {
        graph.addVertex(source)
      })

      it('should return true', () => {
        expect(graph.removeAllVertices([source, target])).toBe(true)
      })
    })

    describe('when the graph does contain both vertices', () => {
      beforeEach(() => {
        graph.addVertex(source)
        graph.addVertex(target)
      })

      it('should return true', () => {
        expect(graph.removeAllVertices([source, target])).toBe(true)
      })
    })
  })
})
