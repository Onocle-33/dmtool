// rollup.config.js

export default {
  input: 'dmt.js',
  external: ['vue', 'jquery'], // 外部モジュールとして扱う
  output: {
    file: 'bundle.js',
    format: 'iife',
    globals: {
      'firebase/app': 'app$1',      // ← 左辺にパッケージ名、右辺に guessing 名
      'firebase/analytics': 'analytics',
      vue: 'Vue',         // import Vue from 'vue' -> window.Vue
      jquery: '$'        // import $ from 'jquery' -> window.$
    }
  }
};