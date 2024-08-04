const { defineConfig } = require('unocss')
const presetMpx = require('@mpxjs/unocss-base')
// const presetWind = require('@unocss/preset-wind')

module.exports = defineConfig({
  include: [/\.mpx($|\?)/],
  presets: [
    presetMpx()
    // presetWind()
  ]
})
