//1：导入express库和path模块包
const express = require('express');
const path = require('path');

//2:创建应用
const app = express();

//3:集成路由


//4：开启web服务
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log('失败')
    }
    console.log('成功')
})