const {model,Schema} = require('mongoose')
const format = require('../util/format')
module.exports = model('order', {
  user: {type: Object},
  id: {type: String,},
  count:{type:String},
  sku:{type:String,},
  good:{type:Object},
  time:{type:String,},
  price:{type:String},
  address:{type:Object},
  state:{type:String},
  userID:{type:String}
})