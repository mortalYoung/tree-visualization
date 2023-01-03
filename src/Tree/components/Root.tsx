import { css } from '@emotion/react';
import React, { memo, useContext } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { Context, TreeNode } from '..';

export default memo(function Root({
  type,
  data,
  isConnectable,
}: NodeProps<TreeNode>) {
  const { width } = useContext(Context);

  return (
    <>
      <div
        css={css`
          font-family: 'jetbrains-mono', monospace;
          border: 1px solid #c4cbd1;
          border-radius: 8px;
          background-color: white;
          box-sizing: border-box;
          font-size: 10px;
        `}
      >
        <div
          css={css`
            text-transform: uppercase;
            font-size: 10px;
            padding: 4px 8px;
            border-bottom: 1px solid #c4cbd1;
          `}
        >
          {type}
        </div>
        <div
          css={css`
            width: ${width}px;
            padding: 4px 8px;
          `}
        >
          {data.label}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="source"
        isConnectable={isConnectable}
      />
    </>
  );
});
