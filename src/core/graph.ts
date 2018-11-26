import { Edge } from './edge'
import { Vertex } from './vertex'
import { HashMap } from '../hash/hashmap'
import { HashSet } from '../hash/hashset'

/**
 * A graph <tt>G(V,E)</tt> contains a set <tt>V</tt> of vertices and a set <tt>E</tt> of edges.
 *
 * @class Graph
 * @template V the graph vertex type.
 * @template E the graph edge type.
 */
export class Graph<V extends Vertex, E extends Edge<V>> {
  /**
   * Whether the graph is directed.
   *
   * @type {boolean}
   * @memberof Graph
   */
  public readonly directed: boolean

  /**
   * Internal representation of the incidency list.
   *
   * @protected
   * @memberof Graph
   */
  protected readonly map = new HashMap<V, HashSet<E>>()

  /**
   * Internal representation of the edge set.
   *
   * @protected
   * @memberof Graph
   */
  protected readonly edges = new HashSet<E>()

  /**
   * Creates an instance of Graph.
   *
   * @param {boolean} [directed=true] whether the graph is directed.
   * @memberof Graph
   */
  constructor(directed: boolean = true) {
    this.directed = directed
  }

  /**
   * Adds the specified edge to this graph, going from the source vertex to the target vertex.
   * More formally, adds the specified edge, <code>e</code>, to this graph if this graph contains
   * no edge <code>e2</code> such that <code>e2 == e</code>. If this graph already contains such
   * an edge, the call leaves this graph unchanged and returns <tt>false</tt>. Some graphs do
   * not allow edge-multiplicity. In such cases, if the graph already contains an edge from the
   * specified source to the specified target, than this method does not change the graph and
   * returns <tt>false</tt>. If the edge was added to the graph, returns <tt>true</tt>.
   *
   * The source and target vertices must already be contained in this graph. An error is thrown
   * if they are not found in the graph.
   *
   * @param {E} edge the edge to be added to this graph.
   * @returns {boolean} <tt>true</tt> if this graph did not already contain the specified edge.
   * @memberof Graph
   */
  addEdge(edge: E): boolean {
    if (!this.containsVertex(edge.source)) throw Error('source of edge not found in graph')
    if (!this.containsVertex(edge.target)) throw Error('target of edge not found in graph')
    const contained = this.containsEdge(edge)
    if (!contained) {
      this.addDirectedEdge(edge)
      if (!this.directed) {
        this.addDirectedEdge(edge.reverse())
      }
    }
    return !contained
  }

  /**
   * Helps to add an edge to the graph. If you want to add an edge in an
   * undirected graph, call this method twice, once passing the edge and
   * once passing the reversed edge.
   *
   * @protected
   * @param {E} edge the edge to be added to this graph.
   * @memberof Graph
   */
  protected addDirectedEdge(edge: E): void {
    this.map.get(edge.source)!.add(edge)
    this.edges.add(edge)
  }

  /**
   * Adds multiple vertices to the graph.
   *
   * @param {V[]} vertices the vertices to be added to this graph.
   * @returns {boolean} <tt>true</tt> if this graph was modified as result of the call.
   * @memberof Graph
   */
  addVertices(vertices: V[]): boolean {
    let modified = false
    for (const vertex of vertices) {
      modified = this.addVertex(vertex) || modified
    }
    return modified
  }

  /**
   * Adds multiple edges to the graph.
   *
   * @param {E[]} edges the edges to be added to this graph.
   * @returns {boolean} <tt>true</tt> if this graph was modified as result of the call.
   * @memberof Graph
   */
  addEdges(edges: E[]): boolean {
    let modified = false
    for (const edge of edges) {
      modified = this.addEdge(edge) || modified
    }
    return modified
  }

  /**
   * Returns a set of the vertices contained in this graph.
   *
   * @returns {HashSet<V>} a set of the vertices contained in this graph.
   * @memberof Graph
   */
  vertexSet(): HashSet<V> {
    return new HashSet(this.map.keys())
  }

  /**
   * Returns a set of the edges contained in this graph.
   *
   * @returns {HashSet<E>} a set of the edges contained in this graph.
   * @memberof Graph
   */
  edgeSet(): HashSet<E> {
    return new HashSet(this.edges.values())
  }

  /**
   * Returns an edge connecting source vertex to target vertex if such vertices and such edge
   * exist in this graph. Otherwise returns <code>undefined</code>. If any of the specified
   * vertices is <code>undefined</code> returns <code>undefined</code>.
   *
   * @param {V} source the source vertex of the edge.
   * @param {V} target the target vertex of the edge.
   * @returns {E} an edge connecting source vertex to target vertex.
   * @memberof Graph
   */
  getEdge(source: V, target: V): E | undefined {
    for (const edge of this.outgoingEdgesOf(source)) {
      if (edge.target.equals(target)) {
        return edge
      }
    }
    return undefined
  }

  /**
   * Returns <tt>true</tt> if this graph contains the specified vertex. More formally, returns
   * <tt>true</tt> if and only if this graph contains a vertex <code>u</code> such that
   * <code>u.equals(v)</code>.
   *
   * @param {V} v the vertex whose presence in this graph is to be tested.
   * @returns {boolean} <tt>true</tt> if this graph contains the specified vertex.
   * @memberof Graph
   */
  containsVertex(vertex: V): boolean {
    return this.map.has(vertex)
  }

  /**
   * Returns <tt>true</tt> if this graph contains the specified edge. More formally, returns
   * <tt>true</tt> if and only if this graph contains an edge <code>e2</code> such that
   * <code>e.equals(e2)</code>.
   *
   * @param {E} e the edge whose presence in this graph is to be tested.
   * @returns {boolean} <tt>true</tt> if this graph contains the specified edge.
   * @memberof Graph
   */
  containsEdge(edge: E): boolean {
    return this.edges.has(edge)
  }

  /**
   * Returns a set of all edges connecting source vertex to target vertex if such vertices exist
   * in this graph. If any of the vertices does not exist or is <code>undefined</code>, returns
   * <code>undefined</code>. If both vertices exist but no edges found, returns an empty set.
   *
   * @param {V} source the source vertex of the edge.
   * @param {V} target the target vertex of the edge.
   * @returns {HashSet<E>} a hashset of all edges connecting source vertex to target vertex.
   * @memberof Graph
   */
  getAllEdges(source: V, target: V): HashSet<E> | undefined {
    if (this.containsVertex(source) && this.containsVertex(target)) {
      const edges = new HashSet<E>()
      for (const edge of this.outgoingEdgesOf(source)) {
        if (edge.target.equals(target)) {
          edges.add(edge)
        }
      }
      return edges
    }
    return undefined
  }

  /**
   * Adds the specified vertex to this graph if not already present. More formally, adds the
   * specified vertex, <code>v</code>, to this graph if this graph contains no vertex
   * <code>u</code> such that <code>u == v</code>. If this graph already contains such vertex,
   * the call leaves this graph unchanged and returns <tt>false</tt>.
   *
   * @param {V} vertex the vertex to be added to this graph.
   * @returns {boolean} <tt>true</tt> if this graph did not already contain the specified vertex.
   * @memberof Graph
   */
  addVertex(vertex: V): boolean {
    const contained = this.containsVertex(vertex)
    if (!contained) {
      this.map.set(vertex, new HashSet<E>())
    }
    return !contained
  }

  /**
   * Returns a set of all edges touching the specified vertex. If no edges are touching the
   * specified vertex returns an empty set.
   *
   * @param {V} vertex the vertex for which a set of touching edges is to be returned.
   * @returns {HashSet<E>} a hashset of all edges touching the specified vertex.
   * @memberof Graph
   */
  edgesOf(vertex: V): HashSet<E> {
    const edges = new HashSet<E>()
    for (const outgoing of this.map.values()) {
      for (const edge of outgoing) {
        if (edge.source.equals(vertex) || edge.target.equals(vertex)) {
          edges.add(edge)
        }
      }
    }
    return edges
  }

  /**
   * Returns the degree of the specified vertex.
   *
   * @param {V} vertex the vertex whose degree is to be calculated.
   * @returns {number} the degree of the specified vertex.
   * @memberof Graph
   */
  degreeOf(vertex: V): number {
    return this.edgesOf(vertex).size
  }

  /**
   * Returns a set of all edges incoming into the specified vertex.
   *
   * @param {V} vertex the vertex for which the set of incoming edges to be returned.
   * @returns {HashSet<E>} a hashset of all edges incoming into the specified vertex.
   * @memberof Graph
   */
  incomingEdgesOf(vertex: V): HashSet<E> {
    const edges = new HashSet<E>()
    for (const outgoing of this.map.values()) {
      for (const edge of outgoing) {
        if (edge.target.equals(vertex)) {
          edges.add(edge)
        }
      }
    }
    return edges
  }

  /**
   * Returns the the number of inward directed edges from the specified vertex.
   *
   * @param {V} vertex the vertex whose degree is to be calculated.
   * @returns {number} the "in-degree" of the specified vertex.
   * @memberof Graph
   */
  inDegreeOf(vertex: V): number {
    return this.incomingEdgesOf(vertex).size
  }

  /**
   * Returns a set of all edges outgoing from the specified vertex.
   *
   * @param {V} vertex the vertex for which the set of outgoing edges to be returned.
   * @returns {HashSet<E>} a hashset of all edges outgoing from the specified vertex.
   * @memberof Graph
   */
  outgoingEdgesOf(vertex: V): HashSet<E> {
    return new HashSet<E>(this.map.get(vertex))
  }

  /**
   * Returns the number of outward directed edges from the specified vertex.
   *
   * @param {V} vertex the vertex whose degree is to be calculated.
   * @returns {number} the "out-degree" of the specified vertex.
   * @memberof Graph
   */
  outDegreeOf(vertex: V): number {
    return this.outgoingEdgesOf(vertex).size
  }

  /**
   * Removes an edge going from source vertex to target vertex, if such vertices and such edge
   * exist in this graph. Returns the edge if removed or <code>undefined</code> otherwise.
   *
   * @param {V} source the source vertex of the edge.
   * @param {V} target the target vertex of the edge.
   * @returns {E} the removed edge, or <code>undefined</code> if no edge removed.
   * @memberof Graph
   */
  removeEdgeBetween(source: V, target: V): E | undefined {
    for (const edge of this.outgoingEdgesOf(source)) {
      if (edge.target.equals(target)) {
        this.map.get(source)!.delete(edge)
        this.edges.delete(edge)
        return edge
      }
    }
    return undefined
  }

  /**
   * Removes the specified edge from the graph. Removes the specified edge from this graph if it
   * is present. More formally, removes an edge <code>e2</code> such that <code>e2.equals(e)</code>,
   * if the graph contains such edge. Returns <tt>true</tt> if the graph contained the specified
   * edge.
   *
   * @param {E} edge the edge to be removed from this graph, if present.
   * @returns {boolean} <code>true</code> if and only if the graph contained the specified edge.
   * @memberof Graph
   */
  removeEdge(edge: E): boolean {
    return this.removeEdgeBetween(edge.source, edge.target) !== undefined
  }

  /**
   * Removes the specified vertex from this graph including all its touching edges if present.
   * More formally, if the graph contains a vertex <code>u</code> such that <code>u.equals(v)</code>,
   * the call removes all edges that touch <code>u</code> and then removes <code>u</code> itself.
   * If no such <code>u</code> is found, the call leaves the graph unchanged. Returns <tt>true</tt>
   * if the graph contained the specified vertex.
   *
   * @param {V} vertex the vertex to be removed from this graph, if present.
   * @returns {boolean} <code>true</code> if the graph contained the specified vertex.
   * @memberof Graph
   */
  removeVertex(vertex: V): boolean {
    const contained = this.containsVertex(vertex)
    if (contained) {
      // Remove the outgoing edges.
      this.map.delete(vertex)
      // Remove the incoming edges.
      this.vertexSet().forEach(source => {
        this.removeEdgeBetween(source, vertex)
      })
    }
    return contained
  }

  /**
   * Removes all the edges in this graph that are also contained in the specified edge collection.
   * After this call returns, this graph will contain no edges in common with the specified edges.
   *
   * @param {E} edges the edges to be removed from this graph.
   * @returns {boolean} <tt>true</tt> if this graph changed as a result of the call.
   * @memberof Graph
   */
  removeAllEdges(edges: E[]): boolean {
    let changed = false
    for (const edge of edges) {
      if (this.removeEdge(edge)) {
        changed = true
      }
    }
    return changed
  }

  /**
   * Removes all the edges going from the specified source vertex to the specified target vertex,
   * and returns a set of all removed edges. Returns <code>undefined</code> if any of the specified
   * vertices does not exist in the graph. If both vertices exist but no edge is found, returns an
   * empty set.
   *
   * @param {V} source the source vertex of the edge.
   * @param {V} target the target vertex of the edge.
   * @returns {HashSet<E>} the removed edges, or <code>undefined</code> if either vertex is not part
   *                       of the graph.
   * @memberof Graph
   */
  removeAllEdgesBetween(source: V, target: V): HashSet<E> | undefined {
    let removedEdges = undefined
    if (this.containsVertex(source) && this.containsVertex(target)) {
      removedEdges = new HashSet<E>()
      let edge = this.removeEdgeBetween(source, target)
      while (edge !== undefined) {
        removedEdges.add(edge)
        edge = this.removeEdgeBetween(source, target)
      }
    }
    return removedEdges
  }

  /**
   * Removes all the vertices in this graph that are also contained in the specified vertex
   * collection. After this call returns, this graph will contain no vertices in common with the
   * specified vertices.
   *
   * @param {V[]} vertices the vertices to be removed from this graph.
   * @returns {boolean} <tt>true</tt> if this graph changed as a result of the call
   * @memberof Graph
   */
  removeAllVertices(vertices: V[]): boolean {
    let changed = false
    for (const vertex of vertices) {
      changed = this.removeVertex(vertex) || changed
    }
    return changed
  }

  /**
   * Removes all edges and vertices from the graph.
   *
   * @memberof Graph
   */
  clear(): void {
    this.map.clear()
    this.edges.clear()
  }
}
