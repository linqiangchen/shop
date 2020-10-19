const {model,Schema} = require('mongoose')
module.exports = model('address', {
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  name: {type: String,required: true},
  phone:{type: String,required: true},
  location: {type:String,required: true},
  detail: {type:String,required: true},
  Postcode:{type:String,required: true},
  isDefault:{type:Boolean,required: true,default:false},
})