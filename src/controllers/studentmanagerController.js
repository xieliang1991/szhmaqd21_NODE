//导入相关包
const path = require('path')
const xtpl = require('xtpl')
const databasetool = require(path.join(__dirname, '../tools/databasetool.js'))


//1:最终处理，返回获取到学生列表页面
exports.getStudentListPage = (req, res) => {
    const keyword = req.query.keyword || '';
    //获取到session保存的用户名
    const username = req.session.username;
    //console.log(keyword)
    databasetool.findList('studentInfo', {
        name: {
            $regex: keyword
        }
    }, (err, docs) => {

        /**
         * 参数1：要渲染的页面的路径，最终找到list.html是根据绝对路径去找
         * 参数2：渲染页面所需要的数据
         * 参数3：渲染完毕之后的回调
         */
        //console.log(docs)
        xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), {
            students: docs,
            keyword,
            username
        }, function (error, content) {
            //返回给浏览器请求的list页面
            res.send(content)
        })
    })
}

//2:最终处理，返回新增学生页面
exports.getAddStudentPage = (req, res) => {
    //获取到session保存的用户名
    const username = req.session.username;
    xtpl.renderFile(path.join(__dirname, '../statics/views/add.html'), {
        username
    }, function (error, content) {
        //返回给浏览器请求的list页面
        res.send(content)
    })
}



//3:处理新增请求,返回新增操作之后的html(html中有一段可以执行js)
exports.addStudent = (req, res) => {
    databasetool.insertOne('studentInfo', req.body, (err, result) => {
        if (result == null) {
            //新增失败
            res.send(`<script>alert('新增失败!');</script>`)
        } else {
            //新增成功
            res.send(`<script>window.location.href='/studentmanager/list'</script>`)
        }
    })
}



//4:最终处理，返回修改学生页面(带有查询出来的数据)
exports.getEditStudentPage = (req, res) => {
    //获取到session保存的用户名
    const username = req.session.username;
    databasetool.findOne('studentInfo', {
        _id: databasetool.ObjectId(req.params.studentId)
    }, (err, doc) => {
        xtpl.renderFile(path.join(__dirname, "../statics/views/edit.html"), {
            student: doc,
            username
        }, function (error, content) {
            res.send(content)
        })
    })
}


//5:最终处理，修改某条数据；根据ID修改
exports.editSyudent = (req, res) => {
    databasetool.updateOne('studentInfo', {
        _id: databasetool.ObjectId(req.params.studentId)
    }, req.body, (err, result) => {
        if (result == null) {
            //修改失败
            res.send(`<script>alert('修改失败！');</script>`)
        } else {
            //修改成功；跳转到列表页
            res.send(`<script>window.location.href="/studentmanager/list"</script>`)
        }
    })
}

//6:最终处理，删除某条数据；根据ID删除
exports.deleteStudent = (req, res) => {
    databasetool.deleteOne('studentInfo', {
        _id: databasetool.ObjectId(req.params.studentId)
    }, (err, result) => {
        if (result == null) {
            //删除失败
            res.send(`<script>alert('删除失败');</script>`)
        } else {
            //删除成功,返回跳转到列表页面的JS 脚本代码
            res.send(`<script>window.location.href='/studentmanager/list'</script>`)
        }
    })
}