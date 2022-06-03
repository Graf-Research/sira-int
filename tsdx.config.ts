//tsdx.config.js
const cjs = require('rollup-plugin-cjs-es')

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      cjs({
        nested: true,
      })
    );
    return config
  },
}