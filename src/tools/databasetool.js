//连接数据库的第三方包
const MongoClient = require("mongodb").MongoClient;
//数据库路径
const url = "mongodb://localhost:27017";

//数据库名
const dbName = "szhmqd21";

//暴露查找所有数据的方法；参数一集合名称；参数二参数对象，参数三回调函数
exports.findList = (collectionName, params, callback) => {
    //console.log(keyword)
    MongoClient.connect(
        url, {
            useNewUrlParser: true
        },
        function (err, client) {
            // 获取db对象
            const db = client.db(dbName);

            //拿到要操作的集合
            const collection = db.collection(collectionName);
            //去数据库查询
            collection.find(
                params).toArray((err, docs) => {
                // 关闭与数据库的连接 
                client.close();
                //执行回调函数，把结果返回给控制器
                callback(err, docs)

            })
        })
}

//暴露查找一条数据的方法；参数一集合名称；参数二参数对象，参数三回调函数
exports.findOne = (collectionName, params, callback) => {
    MongoClient.connect(
        url, {
            useNewUrlParser: true
        },
        function (err, client) {
            // 拿到了数据操作的db对象
            const db = client.db(dbName);
            // 拿到集合
            const collection = db.collection(collectionName);
            // 先根据用户名查询
            collection.findOne(params, (err, doc) => {
                //console.log(doc)
                // 关掉和数据库的连接
                client.close();
                callback(err, doc)
            })
        })
}

//暴露新增一条数据的方法；参数一集合名称；参数二参数对象，参数三回调函数
exports.insertOne = (collectionName, params, callback) => {
    MongoClient.connect(
        url, {
            useNewUrlParser: true
        },
        function (err, client) {
            // 拿到了数据操作的db对象
            const db = client.db(dbName);
            // 拿到集合
            const collection = db.collection(collectionName);
         
            // 根据用户名查询查询一条
            collection.insertOne(params, (err, result) => {
                // 关掉和数据库的连接
                client.close();
                callback(err, result)
            })
        })
}