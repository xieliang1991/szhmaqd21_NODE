//1:导入相关模块
const express = require('express')
const path = require('path')
//2、创建路由对象
const studentManagerRouter = express.Router();

//3:导入控制器
const studentManagerCTRL = require(path.join(__dirname,"../controllers/studentmanagerController.js"));

//4：处理具体的请求
studentManagerRouter.get('/list',studentManagerCTRL.getStudentListPage);

//5:导出
module.exports=studentManagerRouter;