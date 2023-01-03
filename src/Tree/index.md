# Tree

This is an example component.

```jsx
/**
 * iframe: true
 */
import { Tree } from 'tree-visualization';

export default () => (
  <Tree
    data={[
      {
        key: 'root',
        label: 'root',
        type: 'root',
        children: [
          { key: '1', label: 'hello' },
          { key: '2', label: 'world' },
        ],
      },
    ]}
  />
);
```
