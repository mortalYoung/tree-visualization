import dagre from 'dagre';
import React, { useEffect, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  Position,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Root from './components/Root';
import Statement from './components/Statement';
import { generateNodes } from './utils';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (
  nodes: Node<any>[],
  edges: Edge<any>[],
  size: { width: number; height: number },
) => {
  dagreGraph.setGraph({ rankdir: 'TB' });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: size.width, height: size.height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Top;
    node.sourcePosition = Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - size.width / 2,
      y: nodeWithPosition.y - size.height / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export const Context = React.createContext({
  width: 0,
  height: 0,
});

export interface TreeNode {
  key: string;
  label: string;
  type: string;
  children?: TreeNode[];
}

interface ITreeProps {
  data: TreeNode[];
  size?: {
    width: number;
    height: number;
  };
}

export default function Tree({ data, size }: ITreeProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const realSize = useMemo(() => {
    return {
      width: size?.width ?? 172,
      height: size?.height ?? 36,
    };
  }, [size]);

  useEffect(() => {
    const layouted = getLayoutedElements(...generateNodes(data), realSize);
    setNodes(layouted.nodes);
    setEdges(layouted.edges);
  }, []);

  const nodeTypes = useMemo(
    () => ({
      root: Root,
      statement: Statement,
    }),
    [],
  );

  return (
    <Context.Provider
      value={{
        width: realSize.width,
        height: realSize.height,
      }}
    >
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          fitView
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </Context.Provider>
  );
}
