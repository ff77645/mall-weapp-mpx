const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  outputDir: `dist/${process.env.MPX_CURRENT_TARGET_MODE}`,
  pluginOptions: {
    mpx: {
      plugin: {
        srcMode: 'wx',
        hackResolveBuildDependencies: ({ files, resolveDependencies }) => {
          const path = require('path')
          const packageJSONPath = path.resolve('package.json')
          if (files.has(packageJSONPath)) files.delete(packageJSONPath)
          if (resolveDependencies.files.has(packageJSONPath)) {
            resolveDependencies.files.delete(packageJSONPath)
          }
        }
        // modeRules: {
        //   wx: {
        //     include: [
        //       path.resolve('node_modules/@vant')
        //     ]
        //   }
        // }
        // resolveMode: 'native',
        // projectRoot: path.resolve(__dirname, '../src')
        // miniNpmPackage: ['@vant/weapp']
      },
      loader: {},
      unocss: {}
    }
  },
  /**
   * 如果希望node_modules下的文件时对应的缓存可以失效，
   * 可以将configureWebpack.snap.managedPaths修改为 []
   */
  configureWebpack(config) {
    return {
      module: {
        rules: [
          { test: /\.scss/, use: 'sass-loader' }
        ]
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        }
      }
    }
  }
})
