//这里专门负责编写请求逻辑代码 
 
 //1:导入路径操作模块path
const path = require('path');

//导出处理登陆页面请求；
exports.getLoginPage = (req,res)=>{
    //返回一个页面sendFile()
    res.sendFile(path.join(__dirname,'../statics/views/login.html'))
}

//导出处理注册页面请求
exports.getRegisterPage=(req,res)=>{
    //返回注册页面
    res.sendFile(path.join(__dirname,'../statics/views/register.html'))
}
