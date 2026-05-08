// rollup.config.js
import { writeFileSync } from "fs"; // ファイル操作（書き込み）のためのモジュール
import { fileURLToPath } from "url"; // ファイルURLをファイルパスに変換するためのモジュール
import { dirname, resolve } from "path"; // ファイルパスを操作するためのモジュール
import resolvePlugin from "@rollup/plugin-node-resolve"; // node_modulesからモジュールを解決するためのプラグイン
import commonjs from "@rollup/plugin-commonjs"; // CommonJSモジュールをESモジュールに変換するためのプラグイン
import image from "@rollup/plugin-image"; // 画像ファイルをインポートできるようにするためのプラグイン
import scss from "rollup-plugin-scss"; // SCSSファイルをCSSにコンパイルするためのプラグイン
import copy from "rollup-plugin-copy"; // ファイルやフォルダをコピーするためのプラグイン
import serve from "rollup-plugin-serve"; // 開発サーバーを提供するためのプラグイン

// __dirnameと__filenameは、モジュールのディレクトリとファイル名を取得するために使います
const __filename = fileURLToPath(import.meta.url); // 現在のファイルのURLをパスに変換
const __dirname = dirname(__filename); // 現在のディレクトリパスを取得
export default {
  input: 'dmt.mjs',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [
    resolvePlugin(), // node_modulesからモジュールを解決する
    commonjs(), // CommonJSモジュールをESモジュールに変換する
    image(), // 画像ファイルをインポートできるようにする
    scss({
      output: function (styles) {
        // SCSSをCSSにコンパイルし、指定されたファイルに出力する
        writeFileSync(resolve(__dirname, "dist/bundle.css"), styles);
      },
      outputStyle: "compressed", // CSSの出力スタイル: 圧縮
      failOnError: true, // エラーが発生した場合、ビルドプロセスを停止する
    }),
    copy({
      // ファイルやフォルダをコピーする設定
      targets: [{ src: "index.html", dest: "dist" }], // index.htmlをdistフォルダにコピーする
    }),
    serve({
      open: true, // サーバー起動時にブラウザを自動的に開く
      contentBase: ["dist"], // サーバーが提供する静的ファイルのベースディレクトリ
      port: 9001, // サーバーがリッスンするポート番号
    }),
  ],
};