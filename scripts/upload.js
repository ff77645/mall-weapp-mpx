const ci = require('miniprogram-ci')
// 注意： new ci.Project 调用时，请确保项目代码已经是完整的，避免编译过程出现找不到文件的报错。
const dayjs = require('dayjs')
const path = require('path')

const projectPath = path.resolve(__dirname, '../dist/wx')
const privateKeyPath = path.resolve(__dirname, '../static/wx/private.wxdebec0414d939220.key')
;(async () => {
  const project = new ci.Project({
    appid: 'wxdebec0414d939220',
    type: 'miniProgram',
    projectPath,
    privateKeyPath
  })
  const date = dayjs().format('YYYY-MM-DD HH:mm:ss')
  await ci.upload({
    project,
    version: '0.1.1',
    desc: `ci/cd ${date}`,
    setting: {
      es6: true
    },
    onProgressUpdate: console.log
  })
})()
