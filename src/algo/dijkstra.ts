import { Vertex } from '../core/vertex'
import { Edge } from '../core/edge'
import { Graph } from '../core/graph'
import { HashMap } from '../hash/hashmap'
import { HashSet } from '../hash/hashset'

export function shortestPath<V extends Vertex, E extends Edge<V>>(
  graph: Graph<V, E>,
  start: V,
  end: V
): E[] {
  if (!graph.containsVertex(start)) throw Error('Graph must contain start vertex')
  if (!graph.containsVertex(end)) throw Error('Graph must contain end vertex')

  const unvisited = new HashSet<V>()
  const distances = new HashMap<V, number>()
  const previous = new HashMap<V, E>()
  graph.vertexSet().forEach(vertex => {
    unvisited.add(vertex)
    distances.set(vertex, Infinity)
  })
  distances.set(start, 0)

  while (unvisited.size > 0) {
    let current!: V
    let currentDistance: number = Infinity
    unvisited.forEach(vertex => {
      const distance = distances.get(vertex)!
      if (distance < currentDistance) {
        current = vertex
        currentDistance = distance
      }
    })
    unvisited.delete(current)

    if (current.equals(end)) break

    graph.outgoingEdgesOf(current).forEach(edge => {
      const target = edge.target
      const distance = currentDistance + edge.weight
      if (distance < distances.get(target)!) {
        distances.set(target, distance)
        previous.set(current, graph.getEdge(current, target)!)
      }
    })
  }

  const path = []
  let source = start
  while (!source.equals(end)) {
    const edge = previous.get(source)!
    path.push(edge)
    source = edge.target
  }
  return path
}
