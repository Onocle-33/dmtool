// rollup.config.js

export default {
  input: 'dmt.js',
  external: ['vue', 'jquery', './firebase/app','./firebase/analytics','dmt'], // 外部モジュールとして扱う
  output: {
    file: 'bundle.js',
    format: 'iife',
    globals: {
      './dmt.js':'dmt',
      './firebase/app': 'app$1',      // ← 左辺にパッケージ名、右辺に guessing 名
      './firebase/analytics': 'analytics',
      vue: 'Vue',         // import Vue from 'vue' -> window.Vue
      jquery: '$'        // import $ from 'jquery' -> window.$
    }
  }
};