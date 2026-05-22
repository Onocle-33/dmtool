// rollup.config.mjs
import { nodeResolve } from '@rollup/plugin-node-resolve'; // ← 1. プラグインをインポート

export default {
  input: 'dmt.js',
  // external は空（または使い道がないなら丸ごと削除）にします
  external: [], 
  output: {
    file: 'bundle.js',
    format: 'iife',
    name: 'dmt',
    globals: {} // グローバル指定も空にします
  },
  plugins: [
    nodeResolve() // ← 2. ここでプラグインを発動させる
  ]
};