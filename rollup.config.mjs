// rollup.config.js

export default {
  input: 'dmt.js',
  external: ['vue', 'jquery'], // 外部モジュールとして扱う
  output: {
    file: 'bundle.js',
    format: 'iife',
    globals: {
      dmtool:'app$1',
      vue: 'Vue',         // import Vue from 'vue' -> window.Vue
      jquery: '$'        // import $ from 'jquery' -> window.$
    }
  }
};