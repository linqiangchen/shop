const {model,Schema} = require('mongoose')
const format = require('../util/format')
module.exports = model('comment', {
  user: {type: Schema.Types.ObjectId,ref:'user'},
  goodID:{type: Schema.Types.ObjectId,ref:'good'},
  orderID:{type: String},
  id: {type: String},
  con:{type:String},
  time:{type:String},
  star:{type:String}
})