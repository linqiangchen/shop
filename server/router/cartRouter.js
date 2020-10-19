const {Router} = require('express');
const Good = require('../module/good')
const Cart = require('../module/cart')
const router = new Router();

function randomInt(min,max){
    return  parseInt( Math.random()*(max-min) + min)
}


router.post('/addCart',async (req,res)=>{
    const {goodID , sku,count} = req.body;
    const user = req.session.user._id;
    const good = await Good.findById(goodID)
    const result = await Cart.findOne({user,sku,goodID});
    if(!result){
        Cart.create({
            user,
            goodID,
            good,
            sku,
            count
        })
    }else{
     const rlt = await   Cart.updateOne({user,sku,goodID},{count:result.count*1 + count*1})
     
    }
    res.json({
        code:0,
        msg:'添加成功'
    })
})
router.get('/getCart',async (req,res)=>{

    const result = await Cart.find({user:req.session.user._id}); 
    res.json({
        code:0,
        data:result
    })
})
router.get('/updateCartCount',async (req,res)=>{

    const{id,count} = req.query
  const result = await  Cart.findByIdAndUpdate(id,{count})
    res.json({
        code:0,
        data:result
    })
})
module.exports = router