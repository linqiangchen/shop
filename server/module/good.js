const {model,Schema} = require('mongoose')
const format = require('../util/format')
module.exports = model('good', {
publisher: {type: String},
  id: {type: Number ,default:Date.now()},
  title:{type:String},
  sku:{type:Array,},
  img:{type:Object},
  time:{type:String,default:format(new Date(), "yyyy-MM-dd hh:mm:ss")},
  price:{type:Number},
  oldPrice:{type:Number},
  detail:{type:Array},
  state:{type:String},
  classify:{type:String},
  sale:{type:Number},
  count:{type:Number}
})