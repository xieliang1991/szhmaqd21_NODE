//1：导入express库和path模块包
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')//处理post请求第三方包
const session = require('express-session')//第三方包，服务端session保存验证码
//2:创建应用
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))
//3:集成路由
const accountRouter = require(path.join(__dirname,'routers/accountRouter.js'));
const studentManagerRouter = require(path.join(__dirname,"./routers/studentmanagerRouter.js"))
app.use('/account',accountRouter);
app.use('/studentmanager',studentManagerRouter)
//4：开启web服务
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log('失败')
    }
    console.log('成功')
})