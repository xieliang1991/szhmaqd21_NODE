//这里专门编写路由的代码

//1:导入express框架以及path
const express = require('express');
const path = require('path');

//2:创建路由对象
const accountRouter = express();

//3:导入控制器
const accountCTRL = require(path.join(__dirname,'../controllers/accountController.js'))

//4:处理具体的请求
//4.1:获取登陆页面的请求
accountRouter.get('login',accountCTRL.getLoginPage)
//4.2:获取注册页面的请求
accountRouter.get('register',accountCTRL.getRegisterPage)

//5:导出路由
module.exports=accountRouter;