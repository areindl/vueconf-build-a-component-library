// rollup.config.js
import fs from "fs"
import path from "path"
import vue from "rollup-plugin-vue"
import alias from "@rollup/plugin-alias"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import babel from "@rollup/plugin-babel"
import { terser } from "rollup-plugin-terser"
import minimist from "minimist"
import bundleScss from "rollup-plugin-bundle-scss"
import css from "rollup-plugin-css-only"

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs
  .readFileSync("./.browserslistrc")
  .toString()
  .split("\n")
  .filter((entry) => entry && entry.substring(0, 2) !== "ie")

const argv = minimist(process.argv.slice(2))

const projectRoot = path.resolve(__dirname, "../..")

const baseConfig = {
  input: "src/entry.ts",
  plugins: {
    preVue: [
      alias({
        entries: [
          {
            find: "@",
            replacement: `${path.resolve(projectRoot, "src")}`,
          },
        ],
      }),
    ],
    replace: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    vue: {
      css: false,
      template: {
        isProduction: true,
      },
    },
    bundleScss: {
      output: "fuel.scss",
    },
    css: {
      output: false,
    },
    postVue: [
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      }),
    ],
    babel: {
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      babelHelpers: "bundled",
    },
  },
}

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  "vue",
  "@fortawesome/vue-fontawesome",
  "@fortawesome/fontawesome-svg-core",
  "@fortawesome/pro-solid-svg-icons",
]

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: "Vue",
  "@fortawesome/vue-fontawesome": "VueFontawesome",
  "@fortawesome/fontawesome-svg-core": "FontawesomeSvgCore",
  "@fortawesome/pro-solid-svg-icons": "ProSolidSvgIcons",
}

// Customize configs for individual targets
const buildFormats = []
if (!argv.format || argv.format === "es") {
  const esConfig = {
    ...baseConfig,
    input: "src/entry.esm.ts",
    external,
    output: {
      file: "dist/fuel.esm.js",
      format: "esm",
      exports: "named",
      sourcemap: false,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      commonjs(),
      bundleScss({ ...baseConfig.plugins.bundleScss }),
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      css({ ...baseConfig.plugins.css }),
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            "@babel/preset-env",
            {
              targets: esbrowserslist,
            },
          ],
        ],
      }),
    ],
  }
  buildFormats.push(esConfig)
}

// Export config
export default buildFormats
