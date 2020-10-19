const {model,Schema} = require('mongoose')
const format = require('../util/format')
module.exports = model('cart', {
  user: {type: String},
  goodID: {type: String},
  count:{type:String},
  sku:{type:String,},
  good:{type:Object},
  time:{type:String,default:format(new Date(), "yyyy-MM-dd hh:mm:ss")}
})