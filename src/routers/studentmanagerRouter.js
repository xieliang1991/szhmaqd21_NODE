//1:导入相关模块
const express = require('express')
const path = require('path')
//2、创建路由对象
const studentManagerRouter = express.Router();

//3:导入控制器
const studentManagerCTRL = require(path.join(__dirname,"../controllers/studentmanagerController.js"));

//4：处理获取学生列表页面的请求
studentManagerRouter.get('/list',studentManagerCTRL.getStudentListPage);

//5:获取新增页面请求
studentManagerRouter.get('/add',studentManagerCTRL.getAddStudentPage)

//6:完成新增操作
studentManagerRouter.post('/add',studentManagerCTRL.addStudent)


//7：获取修改页面的请求
studentManagerRouter.get('/edit/:studentId',studentManagerCTRL.getEditStudentPage)


//8：完成修改操作
studentManagerRouter.post('/edit/:studentId',studentManagerCTRL.editSyudent)


//:完成删除操作
studentManagerRouter.get('/delete/:studentId',studentManagerCTRL.deleteStudent)



//9:导出
module.exports=studentManagerRouter;