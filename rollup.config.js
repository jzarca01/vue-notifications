import pkg from './package.json'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

const externalDeps = Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies))
const nodeDeps = ['path']
const external = externalDeps.concat(nodeDeps)

const pluginName = 'vue-notifications'

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
    // external: ['ms'],
    external: external,
    output: [
      {file: pkg.main, format: 'umd', name: pluginName}
    ],
    sourcemap: true,
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
];