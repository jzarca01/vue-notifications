import pkg from './package.json'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import uglify from 'rollup-plugin-uglify'
import conditional from "rollup-plugin-conditional"

const externalDeps = Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies))
const nodeDeps = ['path']
const external = externalDeps.concat(nodeDeps)

const pluginName = 'vue-notifications'

const isProduction = process.env.buildTarget === "production"

export default [
  {
    input: 'src/main.js',
    output: {
      file: pkg.browser,
      format: 'umd'
    },
    name: pluginName
  },
  {
    input: 'src/main.js',
    external: external,
    output: [
      {file: pkg.main, format: 'umd', name: pluginName}
      // {file: `dist/${pluginName}.min.js`, format: 'umd', name: pluginName}
    ],
    watch: {
      exclude: ['node_modules/**']
    },
    sourcemap: true,
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),

      conditional(isProduction, [
        uglify(),
      ]),

      conditional(!isProduction, [
        filesize(),
        // watch()
      ])
    ]
  }
];