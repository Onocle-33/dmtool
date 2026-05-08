// rollup.config.js

export default {
  input: 'dmt.js',
  output: {
    file: 'bundle.js',
    format: 'iife',
    globals: {
      vue: 'Vue',         // import Vue from 'vue' -> window.Vue
      jquery: '$'        // import $ from 'jquery' -> window.$
    }
  }
};