// rollup.config.js
export default {
  input: 'dmt.mjs',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  target: 'node', // Node.js向けの場合
};