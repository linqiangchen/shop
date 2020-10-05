module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue:40,
      propList: ['*']
    }
  }
}
// const pxtorem = require('postcss-pxtorem')
// const autoprefixer = require('autoprefixer')

// module.exports = ({ file }) => {
//   let rootValue
//   if (file && file.dirname && file.dirname.indexOf('van') > -1) {
//     rootValue = 16
//   } else {
//     rootValue = 40
//   }
//   return {
//     plugins: [
//       autoprefixer(),
//       pxtorem({
//         rootValue: rootValue,
//         propList: ['*'],
//         minPixelValue: 2
//       })
//     ]
//   }
// }