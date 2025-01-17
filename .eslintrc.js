module.exports = {
  root: true,
  extends: ['@mpxjs'],
  rules: {
    // .mpx文件规则 https://mpx-ecology.github.io/eslint-plugin-mpx/rules/
    camelcase: 'off',
    'mpx/valid-wx-key': ['error', {
      keywords: ['this']
    }]
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        // .js文件规则 https://eslint.bootcss.com/docs/rules/

      }
    }
  ]
}
