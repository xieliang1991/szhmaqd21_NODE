//导入相关包
const path = require('path')
const xtpl = require('xtpl')
const studentsTolls=require(path.join(__dirname,'../tools/databasetool.js'))


//最终处理，返回获取到学生列表页面
exports.getStudentListPage = (req, res) => {
    const keyword = req.query.keyword || '';
    
    //console.log(keyword)
    studentsTolls.findList('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
        
        /**
         * 参数1：要渲染的页面的路径，最终找到list.html是根据绝对路径去找
         * 参数2：渲染页面所需要的数据
         * 参数3：渲染完毕之后的回调
         */
        //console.log(docs)
        xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), {
            students: docs,
            keyword
        }, function (error, content) {
            //返回给浏览器请求的list页面
            res.send(content)
        })
    })
   
}

