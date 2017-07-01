const CDN = process.env.CDN === 'true'
const DISTRIBUTION = process.env.DISTRIBUTION
const PLATFORM = process.env.PLATFORM
const CONFIGURATION = process.env.CONFIG

const configs = {
  target: `${DISTRIBUTION}-${PLATFORM}`,
  get outputPath() {
    return `dist/${this.target}/static/`
  },
  entry: `./src/platforms/${DISTRIBUTION}/${PLATFORM}`,
  publicPath: null,
  filePublicPath: null
}

// if (CDN) {
//   const cdnPublicPath = `https://dn-st.teambition.net/${configs.target}/static/`
//   switch (DISTRIBUTION) {
//     case 'dingtalk':
//       // 钉钉平台，使用离线包，而图像（`url-loader`）则仍是 CDN 加速
//       configs.publicPath = 'https://ding.teambition.com/static/'
//       configs.filePublicPath = cdnPublicPath
//       break
//     case 'teambition':
//       configs.publicPath = './static/'
//       break
//     default:
//       // 使用 CDN 加速
//       configs.publicPath = cdnPublicPath
//       break
//   }
// } else {
//   if (DISTRIBUTION === 'shunfeng') {
//     // 顺丰
//     configs.publicPath = '/sf/static/'
//   } else if (DISTRIBUTION === 'cms') {
//     configs.publicPath = '/cms/static/'
//   } else if (DISTRIBUTION === 'wechat' && CONFIGURATION === 'default') {
//     configs.publicPath = '/weixin/static/'
//   } else {
//     configs.publicPath = '/static/'
//   }
// }

// if (!configs.publicPath) {
//   throw new TypeError('configs publicPath couldn\'t be null')
// }

module.exports = configs
