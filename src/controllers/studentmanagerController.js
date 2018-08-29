//导入相关包
const path = require('path')
const xtpl = require('xtpl')
//连接数据库的第三方包
const MongoClient = require("mongodb").MongoClient;
//数据库路径
const url = "mongodb://localhost:27017";

//数据库名
const dbName = "szhmqd21";

//最终处理，返回获取到学生列表页面
exports.getStudentListPage = (req, res) => {
    MongoClient.connect(
        url, {
            useNewUrlParser: true
        },
        function (err, client) {
            // 获取db对象
            const db = client.db(dbName);

            //拿到要操作的集合
            const collection = db.collection("studentInfo");
            //去数据库查询
            collection.find({}).toArray((err, docs) => {
                //关闭数据库连接
                client.close()
                /**
                 * 参数1：要渲染的页面的路径，最终找到list.html是根据绝对路径去找
                 * 参数2：渲染页面所需要的数据
                 * 参数3：渲染完毕之后的回调
                 */
                //console.log(docs)
                xtpl.renderFile(path.join(__dirname,'../statics/views/list.html'),{
                    students:docs
                },function(error,content){
                    //返回给浏览器请求的list页面
                    res.send(content)
                })
            })
        }
    );
}