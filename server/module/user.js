const {model} = require('mongoose')
const format = require('../util/format')
module.exports = model('user', {
  user: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
  avatar: {
    type:String,
    default:'/public/avatar/avatar_girl.png'
  },
  name:{
    type:String,
    default:'匿名用户'
  },
  gender:{
    type:String,
  },
  birth:{
    type:String,
  },

  location: {
    type:String,
  },
  createTime:{
    type:String,
    default:format(new Date(), "yyyy-MM-dd hh:mm:ss")
  },
  state:{
    type:Boolean,
    default:true
  }
})