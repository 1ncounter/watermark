import path from 'path'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const resolve = p => path.resolve(__dirname, p)
const packageOptions = require(resolve('package.json'))
const name = 'Watermark'

const isProd = process.env.NODE_ENV === 'production'

const configs = {
  esm: {
    file: resolve(`dist/${name}.esm-bundler${isProd ? '.prod' : ''}.js`),
    format: `es`
  },
  cjs: {
    file: resolve(`dist/${name}.cjs${isProd ? '.prod' : ''}.js`),
    format: `cjs`
  },
  global: {
    file: resolve(`dist/${name}.global${isProd ? '.prod' : ''}.js`),
    format: `iife`
  },
  'esm-browser': {
    file: resolve(`dist/${name}.esm-browser${isProd ? '.prod' : ''}.js`),
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
  const tsPlugin = ts({
    check: isProd,
    tsconfig: resolve('tsconfig.json'),
    cacheRoot: resolve('node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        declaration: isProd
      },
      exclude: ['**/__tests__']
    }
  })

  const terserPlugin = terser()

  const plugins = [tsPlugin]

  if (isProd) {
    plugins.push(terserPlugin)
  }

  return {
    input: 'src/index.ts',
    output,
    external: ['resize-observer-polyfill'],
    plugins
  }
}
