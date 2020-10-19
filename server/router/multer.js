const router = require("express").Router();
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../static/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
 
  var upload = multer({ storage: storage })
const singleMidle = upload.single("singleFile");//一次处理一张
const arrMidle  = upload.array("arrayFile", 5);//一次最多处理5张
const fieldsMidle  = upload.fields([
  {name:"fieldSingleFile", maxCount:1},
  {name:"fieldArrayFile", maxCount:4}
]);//可同时处理多个上传控件的上传
//实际项目中根据自己的情况，使用以上三种用法之一即可！


module.exports = router;