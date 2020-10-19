const {Router} = require('express');
const Good = require('../module/good');
const Cart = require('../module/cart')
const Order = require('../module/order')
const router = new Router();
const format = require ('../util/format')
function randomInt(min,max){
    return  parseInt( Math.random()*(max-min) + min)
}
router.post('/addOrder',async (req,res)=>{
    const result = await Order.create({...req.body,user:req.session.user,userID:req.session.user._id,time:format(new Date(), "yyyy-MM-dd hh:mm:ss"),id:Date.now()})
    res.json({
        code:0,
        data:result
    })
})

router.post('/addOrders',async (req,res)=>{
    const {orders,cartID} = req.body
    
    const result =  orders.map(item => Order.create({...item,user:req.session.user,userID:req.session.user._id,time:format(new Date(), "yyyy-MM-dd hh:mm:ss"),id:Date.now()}))
    const data = await Promise.all(result)
    const remove = cartID.map(item => Cart.deleteOne({_id:item}))
    const removeResult = await Promise.all(remove)
    
    res.json({
        code:0,
        data
    })
})
router.get('/getAllOrder',async (req,res)=>{
    const {offset = 1, limit=20} = req.query
    
    const result = await Order.find().sort({id:-1}).skip((offset*1 - 1)*limit ).limit(limit*1);
    const count = await Order.countDocuments()
    res.json({
        code:0,
        data:result,
        count,
    })
})
router.get('/getMyOrder',async (req,res)=>{    
    const result = await Order.find({userID:req.session.user._id})
    res.json({
        code:0,
        data:result,
    })
})
router.get('/updateOrderState',async (req,res)=>{  
    const {id,state} = req.query  
    const result = await Order.findByIdAndUpdate(id,{state})
    res.json({
        code:0,
        data:result,
    })
})
module.exports = router