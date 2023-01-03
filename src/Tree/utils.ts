import type { Edge, Node } from 'reactflow';
import type { TreeNode } from '.';

function createNode(data: TreeNode): Node<any> {
  return {
    id: data.key,
    type: data.type || 'statement',
    data,
    position: { x: 0, y: 0 },
  };
}

function createEdge(source: Node<any>, target: Node<any>): Edge<any> {
  return {
    id: `${source.id}__${target.id}`,
    source: source.id,
    target: target.id,
    type: 'smoothstep',
    animated: false,
  };
}

export function generateNodes(data: TreeNode[]) {
  const edges: Edge<any>[] = [];
  const nodes: Node<any>[] = [];

  const stack: { parent: Node<any> | null; node: TreeNode }[] = data.map(
    (item) => ({ parent: null, node: item }),
  );
  while (stack.length) {
    const { parent, node: rawNode } = stack.pop()!;

    const node = createNode(rawNode);
    nodes.push(node);

    if (parent) {
      edges.push(createEdge(parent, node));
    }

    if (rawNode.children?.length) {
      stack.push(
        ...rawNode.children.map((child) => ({ parent: node, node: child })),
      );
    }
  }

  return [nodes, edges] as const;
}
