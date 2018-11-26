import { Edge } from '../../src/core/edge'
import { Graph } from '../../src/core/graph'
import { Vertex } from '../../src/core/vertex'
import { shortestPath } from '../../src/algo/dijkstra'

describe('shortestPath', () => {
  let graph: Graph<Vertex, Edge<Vertex>>

  let v: Vertex[] = []
  let e: Edge<Vertex>[] = []

  beforeEach(() => {
    graph = new Graph<Vertex, Edge<Vertex>>()
    for (let i = 0; i < 8; ++i) {
      v.push(new Vertex(i))
    }
    e.push(new Edge(v[4], v[5], 0.35))
    e.push(new Edge(v[5], v[4], 0.35))
    e.push(new Edge(v[4], v[7], 0.37))
    e.push(new Edge(v[5], v[7], 0.28))
    e.push(new Edge(v[7], v[5], 0.28))
    e.push(new Edge(v[5], v[1], 0.32))
    e.push(new Edge(v[0], v[4], 0.38))
    e.push(new Edge(v[0], v[2], 0.26))
    e.push(new Edge(v[7], v[3], 0.39))
    e.push(new Edge(v[1], v[3], 0.29))
    e.push(new Edge(v[2], v[7], 0.34))
    e.push(new Edge(v[6], v[2], 0.4))
    e.push(new Edge(v[3], v[6], 0.52))
    e.push(new Edge(v[6], v[0], 0.58))
    e.push(new Edge(v[6], v[4], 0.93))

    graph.addVertices(v)
    graph.addEdges(e)
  })

  it('should return the shortest path', () => {
    expect(shortestPath(graph, v[0], v[6])).toEqual([
      e[7], // 0->2  0.26
      e[10], // 2->7  0.34
      e[8], // 7->3  0.39
      e[12] // 3->6  0.52
    ])
  })

  it('should throw an error when called with a source vertex which is not in the graph', () => {
    expect(() => shortestPath(graph, new Vertex(9), v[6])).toThrow()
  })

  it('should throw an error when called with a target vertex which is not in the graph', () => {
    expect(() => shortestPath(graph, v[0], new Vertex(9))).toThrow()
  })
})
