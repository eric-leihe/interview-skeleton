import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
  input: 'src/pagerduty_client.js',
  output: [
    { file: 'dist/pagerduty_client.js', format: 'umd', exports: 'named', name:'PagerDutyClient' },
  ],
  plugins: [nodeResolve({ preferBuiltins: true }), commonjs(), nodePolyfills({ include: 'https'})],
};
