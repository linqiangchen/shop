const {Router} = require('express');
const Admin = require('../../module/admin')
const Good = require('../../module/good')
const router = new Router();
function randomInt(min,max){
    return  parseInt( Math.random()*(max-min) + min)
}
const sku = ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座',]
router.get('/addGood',async (req,res)=>{
//     let good = data.map(item => ({
//         ...item,
//         sku:sku.map(sub => ({
//             img:item.img,
//             title:sub
//         })),
//         price:randomInt(100,1000),
//         oldPrice:randomInt(10,200),
//         detail:[item.img,item.img,item.img,item.img],
//         state:'sale',
//         classify:'其他',
//         sale:randomInt(100,500),
//         count:1000-randomInt(100,300),
//         publisher:'admin'
//     }))
//  const result = await   good.map(item =>
//         Good.create(item)
//     );
//     const goodList = await Promise.all(result)
//     console.log('goodList: ', goodList);
//     res.json(goodList)
})

router.post('/register',async (req,res)=>{//注册
  
    const result = await Admin.findOne({user:req.user})
    if(result){
        res.json({
            code:-1,
            msg:'用户已存在'
        })
    }else{
        await Admin.create(req.body)
        res.json({
            code:0,
            msg:'添加成功'
        })
    }
})
router.post('/login',async (req,res)=>{//登录
    const {user,pass} = req.body
    const result = await Admin.findOne({user,pass},{pass:false})
    if(result){   
        req.session.info = result
        res.json({
            code:0,
            msg:'登陆成功',
            data:result
        })
    }else{
        res.json({
            code:-1,
            msg:'账号或密码错误'
        })
    }
})
router.get('/info',async (req,res)=>{//获取用户信息
    const result = await Admin.findById(req.session.info._id,{pass:false})
    
    res.json({
        code:0,
        data:result
    })
})
router.get('/account',async (req,res)=>{//获取所有账户
    const result = await Admin.find({isAdmin:false},{pass:false})
    res.json({
        code:0,
        data:result
    })
})
router.get('/isLogin',(req,res)=>{//检查登录状态
    if(req.session.info){
        res.json({
            code:0,
            msg:true
        })
    }else{
        res.json({
            code:0,
            msg:false
        }) 
    }
})
router.get('/logout',(req,res)=>{//退出登录
  delete req.session.info;
  
  res.json({
      code:0,
      msg:'退出成功'
  })
})
module.exports = router