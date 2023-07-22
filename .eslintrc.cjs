const { configure, presets } = require('eslint-kit')

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== 'production',

  presets: [
    presets.imports(),
    presets.node(),
    presets.prettier(),
    presets.typescript(),
    presets.react(),
    presets.effector(),
  ],

  extend: {
    rules: {
      'effector/mandatory-scope-binding': 'off',
    },
  },
})
