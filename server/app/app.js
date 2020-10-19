const express = require('express')
const app = express()
const path = require('path')
const userRouter = require('../router/userRouter')
const goodRouter = require('../router/goodRouter')
const cartRouter = require('../router/cartRouter')
const orderRouter = require('../router/orderRouter')
const accountRouter = require('../router/os/accountRouter')
const config = require('../config')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: config.DB_URL,
  collection: 'mySessions'
});
// Catch errors
store.on('error', function(error) {
  console.log(error);
});
app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('static'))
app.use('/public',express.static('static'))
app.use((req,res,next)=>{
     const url = req.url
     if(url === '/api/user/isLogin' || url === '/os/account/isLogin' || url === '/api/user/login' || url === '/api/user/register' || url === 'public' || url === '/os/account/login'){
      next()
     }else{
       if(req.session.user || req.session.info){
         next()
       }else{
         res.json({
           code:-2,
           msg:'需要登录'
         })
       }
     }  
})
app.use('/api/user',userRouter)
app.use('/api/good',goodRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/os/account',accountRouter)
app.use('/dist',(req,res)=>{
  res.sendFile(path.join(__dirname,'../static/dist/index.html'))
})
app.use('/bms',(req,res)=>{
  res.sendFile(path.join(__dirname,'../static/bms/index.html'))
})
module.exports = app