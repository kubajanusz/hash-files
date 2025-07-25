const { configure, presets } = require('eslint-kit')

module.exports = configure({
  root: __dirname,
  presets: [
    presets.prettier(),
    presets.typescript(),
    presets.node(),
    presets.imports(),
  ],
  extend: {
    ignorePatterns: ['!**/*', 'node_modules', 'dist'],
  },
})