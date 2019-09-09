import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

const dist = 'dist';
const bundle = 'plugins';
const production = !process.env.ROLLUP_WATCH;

const outputs = [
  {
    file: `${dist}/${bundle}.cjs.js`,
    format: 'cjs',
  },
  {
    file: `${dist}/${bundle}.esm.js`,
    format: 'esm',
  },
  {
    name: 'plugins',
    file: `${dist}/${bundle}.umd.js`,
    format: 'umd',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
  },
];

const common = {
  input: 'src/index.js',
  plugins: [
    builtins(),
    globals(),
    resolve(),
   
    babel({
      exclude: 'node_modules/**',
    }),
    json(),
    commonjs(),
    production && terser(),
    postcss({
      extract: true,
      minimize: true,
      sourceMap: true,
    }),
  ],
  external: [
    'react',
    'react-dom',
  ],
};

export default outputs.map((output) => ({
  ...common,
  output,
}));
