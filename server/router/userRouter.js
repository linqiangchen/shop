const {Router} = require('express');
const User = require('../module/user')
const Address = require('../module/address')
const router = new Router();
const path = require('path')
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname ,'../static/avatar'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  }) 
const upload = multer({ storage: storage })
const singleMidle = upload.single("file");
const update = async (req,res,key)=>{
    const id = req.session.user._id
    const _key = req.query[key]
    if(!_key){
        res.json({
            code:-2,
            msg:'参数错误'
        }) 
        return
    }
    const result = await User.findByIdAndUpdate(id,{[key]:_key},{new: true})
    
   if(result && result[key] === _key){
    req.session.user = result
    res.json({
        code:0,
        msg:'修改成功'
    })
   }else{
    res.json({
        code:-1,
        msg:'修改失败'
    })
   } 
}
router.post('/register',async (req,res)=>{//注册
    const {user,pass} = req.body
    const result = await User.findOne({user})
    if(result){
        res.json({
            code:-1,
            msg:'用户名重复'
        })
    }else{
        await User.create({user,pass})
        res.json({
            code:0,
            msg:'注册成功'
        })
    }
})
router.post('/login',async (req,res)=>{//登录
    const {user,pass} = req.body
    const result = await User.findOne({user,pass},{pass:false})
    if(result){
        
        req.session.user = result

        res.json({
            code:0,
            msg:'登陆成功'
        })
    }else{
        res.json({
            code:-1,
            msg:'账号或密码错误'
        })
    }
})
router.post("/updateAvatar", singleMidle, async(req, res)=> {//上传头像 
const result =  await User.findByIdAndUpdate(req.session.user._id,{avatar:'/public/avatar/'+req.file.filename},{new: true})
    res.json(result)
});
router.post('/addAddress',async (req,res)=>{//添加地址
   const {name,phone,location,detail,Postcode,isDefault} = req.body
   const id = req.session.user._id
   const result = await Address.create({user:id,name,phone,location,detail,Postcode,isDefault})
   
   res.json(result)
})
router.get('/getAddress',async (req,res)=>{//检查登录状态
    const id = req.session.user._id;
    const result = await Address.find({user:id})
    res.json({code:0,
        data: result
       })
})
router.get('/isLogin',(req,res)=>{//检查登录状态
    if(req.session.user){
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
router.get('/allUser',async (req,res)=>{//检查登录状态
    const {offset = 1, limit=7} = req.query
    const result = await User.find().skip((offset*1 - 1)*limit ).limit(limit*1);
    const count = await User.countDocuments()
    res.json({
        code:0,
        data:result,
        count,
    })  
})
router.get('/logout',(req,res)=>{//退出登录
    delete req.session.user;
    res.json({
        code:0,
        msg:'退出成功'
    })
})
router.get('/updateName',async (req,res)=>{//修改昵称
    update(req,res,'name') 
})
router.get('/updateGender',async (req,res)=>{//修改性别
    update(req,res,'gender')
})
router.get('/updateBirth',async (req,res)=>{//修改生日
    update(req,res,'birth')
})
router.get('/updateLocation',async (req,res)=>{//修改地区
    update(req,res,'location')
})
router.get('/updatePass',async (req,res)=>{//修改地区
    const id = req.session.user._id
    const {oldPass,newPass} = req.query
   const result = await User.findOne({_id:id,pass:oldPass})
   
   if(result){
     const user = await  User.findByIdAndUpdate(id,{pass:newPass},{new: true})
     
     if(user.pass === newPass){
         res.json({
             code:0,
             msg:'修改成功'
         })
     }else{
        res.json({
            code:-1,
            msg:'修改失败'
        })
     }
   }else{
    res.json({
        code:-2,
        msg:'旧密码错误'
    })
   }
})
router.get('/info',async (req,res)=>{//获取用户信息
    const result = await User.findById(req.session.user._id,{pass:false})
    res.json({
        code:0,
        data:result
    })
})

module.exports = router