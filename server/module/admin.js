const {model,Schema} = require('mongoose')
const format = require('../util/format')
module.exports = model('admin', {
  user: {type: String},
  pass: {type: String,default:123456},
  isAdmin:{type:Boolean,default:false},
  auth:{type:Array,default:[]},
  job:{type:String},
  name:{type:String},
  phone:{type:String},
  time:{type:String,default:format(new Date(), "yyyy-MM-dd hh:mm:ss")}
})