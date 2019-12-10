import path from 'path'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const resolve = p => path.resolve(__dirname, p)
const packageOptions = require(resolve('package.json'))
const name = 'Watermark'

const configs = {
  esm: {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: `es`
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: `iife`
  },
  'esm-browser': {
    file: resolve(`dist/${name}.esm-browser.js`),
    format: `es`
  }
}

const defaultFormats = ['esm', 'cjs', 'global']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats

const outputOptions = packageFormats.map(format => ({
  name,
  ...configs[format],
  globals: {
    'resize-observer-polyfill': 'ResizeObserver'
  }
}))

const rollupConfig = createConfig(outputOptions)

export default rollupConfig

function createConfig(output) {
  const shouldEmitDeclarations = process.env.NODE_ENV === 'production'

  const tsPlugin = ts({
    check: process.env.NODE_ENV === 'production',
    tsconfig: resolve('tsconfig.json'),
    cacheRoot: resolve('node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations
      },
      exclude: ['**/__tests__', 'test-dts']
    }
  })

  const terserPlugin = terser()

  const plugins = [tsPlugin]

  if (process.env.NODE_ENV === 'production') {
    plugins.push(terserPlugin)
  }

  return {
    input: 'src/index.ts',
    output,
    external: ['resize-observer-polyfill'],
    plugins
  }
}
