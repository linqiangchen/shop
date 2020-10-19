const {Router} = require('express');
const Good = require('../module/good')
const Order = require('../module/order')
const router = new Router();
const Comment = require('../module/comment');

const format = require ('../util/format')

function randomInt(min,max){
    return  parseInt( Math.random()*(max-min) + min)
}

router.get('/getRecommendGood',async (req,res)=>{
    const result = await Good.find().sort({sale:-1}).limit(20);
    
    res.json({
        code:0,
        data:result
    })
})
router.get('/getNewGood',async (req,res)=>{
    const result = await Good.find().sort({sale:1}).limit(20);
    
    res.json({
        code:0,
        data:result
    })
})
router.get('/removeGood',async (req,res)=>{
    const {_id} = req.query
    const result = await Good.deleteOne({_id})
    res.json({
        code:0,
        data:result
    })
})
router.get('/searchGood',async (req,res)=>{
    const {offset = 1, limit=20,kw=''} = req.query
   let count 
    let result
    if(kw){
        result = await Good.find({"title":{$regex: eval(`/${kw}/ig`)}}).skip((offset*1 - 1)*limit ).limit(limit*1);
        count = await Good.countDocuments({"title":{$regex: eval(`/${kw}/ig`)}})
    }else{
        result = await Good.find().sort({sale:-1}).skip((offset*1 - 1)*limit ).limit(limit*1);
        count = await Good.countDocuments()
    }
    
    res.json({
        code:0,
        data:result,
        count
    })
})
router.get('/getAllGood',async (req,res)=>{
    const {offset = 1, limit=20,sort = 'sale',state=-1} = req.query
    
    const result = await Good.find().sort({[sort]:state}).skip((offset*1 - 1)*limit ).limit(limit*1);
    const count = await Good.countDocuments()
    res.json({
        code:0,
        data:result,
        count,
    })
})
router.get('/getClassifyGood',async (req,res)=>{
    const {classify } = req.query
    let result
    if(classify == -1){
        result = await Good.find().sort({sale:-1}).skip(0).limit(20);
      
    }else{
        result = await Good.find({classify})
    }
    res.json({
        code:0,
        data:result
    })
})
router.post('/addComment',async (req,res) => {
    const {con,star,goodID,orderID} = req.body
    const user = req.session.user._id;
    const result = await Comment.create({
        user,
        con,
        time:format(new Date(), "yyyy-MM-dd hh:mm:ss"),
        star,
        id:Date.now(),
        goodID,
        orderID,
    })
  const Up = await  Order.findByIdAndUpdate(orderID,{state:'完成'},{new: true})
    res.json({
        code:0,
        msg:'评论成功',
        data:result,
        Up
    })
})

router.get('/getAllComment',async (req,res)=>{
    const {offset = 1, limit=7,sort = 'sale',state=-1} = req.query
    
    const result = await Comment.find().populate('user',{avatar:true,name:true}).populate('goodID',{title:true}).sort({time:-1}).skip((offset*1 - 1)*limit ).limit(limit*1);
    const count = await Comment.countDocuments()
    res.json({
        code:0,
        data:result,
        count,
    })
})
router.get('/getGoodComment',async (req,res)=>{
    const {goodID} = req.query
    const result = await Comment.find({goodID}).populate('user',{pass:false}).sort({id:1}).limit(6);
    res.json({
        code:0,
        data:result,
    })
})
module.exports = router