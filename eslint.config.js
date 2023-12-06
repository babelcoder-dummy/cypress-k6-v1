const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  typescript: true,
  rules: {
    'node/prefer-global/process': 0,
    'no-unused-expressions': 0,
  },
})
