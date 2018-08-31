//1：导入express库和path模块包
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')//处理post请求第三方包
const session = require('express-session')//第三方包，服务端session保存验证码
//2:创建应用
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: 'keyboard cat',resave: true,
saveUninitialized: false, cookie: { maxAge: 600000 }}))

//5:判断权限,获取到所有的路径,all代表支持get和post请求，这段代码写在集成路由之前获取session之后
app.all('/*',(req,res,next)=>{
    //如果路径中包含account就代表是注册或者登陆，不需要做判断
    if(req.url.includes('account')){
        next()//代表放行
    }else{
        //判断是否登陆，就看session有没有，如果有就代表登陆就放行，没有就提示以及重定向
        if(req.session.username){
            next()
        }else{ // 没有登录，则响应浏览器一段可以执行的脚本
            res.send(`<script>alert('您还没有登陆，请现登陆!');location.href='/account/login'</script>`)
        }
    }
})

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