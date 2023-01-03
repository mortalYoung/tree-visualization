import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'tree-visualization',
  },
  extraBabelPresets: ['@emotion/babel-preset-css-prop'],
});
